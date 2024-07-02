import User from "../../../models/users.js"
import { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../../utils/sendEmail.js"
import { FieldRequiredError } from "../../../utils/errorsHandler.js"
import db from '../../../db/db.js';

class AuthController {
  static async register(req, res) {
    const { role } = req.body

    try {
      const newUser = db.createUser(role, req.body);
      if (typeof newUser === 'string') {
        throw new FieldRequiredError(`${newUser} is required`);
      }

      await newUser.save();

      // Send confirmation email
      const token = await sendEmail(newUser, 'emailConfirmation.html', { user: newUser });


      res.status(201).json({ "message": "Success, Confirm you email to login.", token });

    } catch (err) {
      if (err.errmsg?.includes("duplicate key") && err.errmsg.includes("email")) {
        return res.status(400).json({ "error": "Email already exists" });
      }

      if (err.errmsg?.includes("duplicate key") && err.errmsg.includes("phone")) {
        return res.status(400).json({ "error": "Phone number already registered" });
      }

      res.status(err.statusCode || 400).json({ error: err, message: err.message });
    }
  }

  static async confirmEmail(req, res) {
    const emailToken = req.query.token;

    try {
      const { user } = jwt.verify(emailToken, process.env.JWT_CONFIRM_EMAIL_SECRET);

      if (user.emailConfirmed) {
        return res.status(400).json({ error: "Email already confirmed" });
      }

      await User.findByIdAndUpdate(user._id, { emailConfirmed: true });

      res.json({ "message": "Email confirmed successfully" });
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!password) return res.status(400).json({ error: "Password is required" });

    try {
      const projection = {
        createdAt: 0,
        __v: 0,
      }
      const userDoc = await User.findOne({ email }, projection);

      if (!userDoc || !compareSync(password, userDoc.password)) {
        return res.status(401).json({ "error": "Incorrect email or password" });
      }

      if (userDoc && !userDoc.emailConfirmed) {
        return res.status(401).json({ "error": "Confirm your email" });
      }

      const user = userDoc.toObject();
      delete user.emailConfirmed;
      delete user.password;

      const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY);
      res.json({ "message": "Login successful", token });
    } catch (err) {
      res.status(500).json({ "error": 'Server error', err });
    }
  }

  static async refreshToken(req, res) {
    const user = req.user;
    try {
      const updatedUser = await User.findById(user._id);
      const newToken = jwt.sign({ user: updatedUser }, process.env.JWT_SECRET_KEY);
      res.status(201).json({ token: newToken });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default AuthController
