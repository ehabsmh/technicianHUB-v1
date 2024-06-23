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

      // Send confirmation email
      const token = await sendEmail(newUser);

      if (token) await newUser.save();
      else return res.status(500).json({ "error": "Failed to send confirmation email" });

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
    const emailToken = req.headers.token;
    if (!emailToken) {
      res.status(400).json({ error: "Token is required" });
    }

    try {
      const { userId } = jwt.verify(emailToken, process.env.JWT_CONFIRM_EMAIL_SECRET);
      const user = await User.findById(userId);

      if (user.emailConfirmed) {
        return res.status(400).json({ error: "Email already confirmed" });
      }

      await user.updateOne({ emailConfirmed: true });

      if (!user) return res.status(400).json({ error: "Invalid token" });

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
      const user = await User.findOne({ email });

      if (user && !user.emailConfirmed) {
        return res.status(401).json({ "error": "Email not confirmed" });
      }

      if (!user || !compareSync(password, user.password)) {
        return res.status(401).json({ "error": "Incorrect email or password" });
      }

      const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY);
      res.json({ "message": "Login successful", token });
    } catch (err) {
      res.status(500).json({ "error": 'Server error', err });
    }
  }
}

export default AuthController