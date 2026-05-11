import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ======================================================
// 🔹 REGISTER USER
// ======================================================

export const registerUser = async (req, res) => {
  try {

   const {
  name,
  email,
  password
} = req.body;

    // 🔥 Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields ❌"
      });
    }

    // 🔥 Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Email already registered ❌"
      });
    }

    // 🔐 Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // 🔥 Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // ✅ Success response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error ❌"
    });
  }
};

// ======================================================
// 🔹 LOGIN USER
// ======================================================

export const loginUser = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    // 🔥 Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password ❌"
      });
    }

    // 🔍 Find user
    const user = await User.findOne({ email });

    // 🔐 Compare password
    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {

      // ✅ Success response
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });

    } else {

      res.status(401).json({
        message: "Invalid email or password ❌"
      });

    }

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error ❌"
    });
  }
};