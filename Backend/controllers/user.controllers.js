import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    let profilePhotoUrl = "";

    // ✅ safe file check
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content
      );
      profilePhotoUrl = cloudResponse.secure_url;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    await newUser.save();

    return res.status(201).json({
      message: `Account created successfully ${fullname}`,
      success: true,
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: "Invalid role",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,       // ✅ dev safe
        sameSite: "Lax",     // ✅ dev safe
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// ================= LOGOUT =================
export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      })
      .json({
        message: "Logout successfully",
        success: true,
      });

  } catch (error) {
    console.log("LOGOUT ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    let cloudinaryResponse;

    // ✅ FIX: file safe handling
    if (file) {
      const fileUri = getDataUri(file);
      cloudinaryResponse = await cloudinary.uploader.upload(
        fileUri.content
      );
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    // ✅ safe updates
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (cloudinaryResponse) {
      user.profile.resume = cloudinaryResponse.secure_url;
      user.profile.resumeOriginalname = file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated successfully",
      user,
      success: true,
    });

  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};