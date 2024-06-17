import User from "../models/users.js"
import { hashSync, compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { sendEmail } from "../utils/sendEmail.js"


export const register = async (req, res) => {
  const { firstName, lastName, email, password, phone, address,
    birthDate, role, picture } = req.body;

  const [mm, dd, yyyy] = birthDate.split('-');

  const saltRounds = 10;

  try {
    let newUser;

    // Hash the password
    const hashed_pw = hashSync(password, saltRounds);

    if (role === 'user') {
      newUser = new User({
        firstName, lastName, email, password: hashed_pw,
        phone, address, birthDate: new Date(yyyy, mm, dd),
        role, picture, customerDetails: { assignedTechIds: [] }
      });
    }

    if (role === 'technician') {

      newUser = new User({
        firstName, lastName, email, password: hashed_pw,
        phone, address, birthDate: new Date(yyyy, mm, dd),
        role, picture, technicianDetails: req.body.technicianDetails,
      });
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

    res.status(400).json({ "error": err });
  }
}


export const confirmEmail = async (req, res) => {
  const emailToken = req.headers.token;
  console.log(emailToken);
  if (!emailToken) {
    res.status(400).json({ "error": "Token is required" });
  }

  try {
    const decoded = jwt.verify(emailToken, process.env.JWT_CONFIRM_EMAIL_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(400).json({ "error": "Invalid token" });
    user.emailConfirmed = true;
    await user.save();
    res.json({ "message": "Email confirmed successfully" });
  } catch (error) {
    res.status(400).json({ error })
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ "error": "Email and password are required" });
  }

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
