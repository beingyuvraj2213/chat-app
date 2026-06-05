import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // hash password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "Invalid Entries" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // Generate Token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Ye h error", error);
    res.status(400).json(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const logout = async (req, res) => {
  try {
    // res.cookie("jwt","",{maxAge:0})
    res.clearCookie("jwt");
    res.status(200).send("Logged Out Successfully");
  } catch (error) {
    res.status(400).send("Logging Out Unsuccessful");
  }
};

export const updateProfilePic = async (req, res) => {
  try {
    const { profilePic, fullName } = req.body;
    const userId = req.user._id;
    const updateFields = {};

    if (typeof fullName === "string" && fullName.trim()) {
      updateFields.fullName = fullName.trim();
    }

    if (profilePic) {
      if (profilePic.startsWith("data:")) {
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        updateFields.profilePic = uploadResponse.secure_url;
      } else if (typeof profilePic === "string" && profilePic.startsWith("http")) {
        updateFields.profilePic = profilePic;
      } else {
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        updateFields.profilePic = uploadResponse.secure_url;
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No profile fields provided" });
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true },
    ).select("-password");

    res.status(200).json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Will be calling whenever a page is refreshed
export const checkAuth = (req, res) => {
  try {
    console.log(req.user)
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
