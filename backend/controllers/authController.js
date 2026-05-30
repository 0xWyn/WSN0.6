import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createAccount = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const usernameTaken = await User.findOne({ username: username });
        if (usernameTaken) {
            console.log(usernameTaken);
            return res.status(401).json({ msg: "Username already taken" });
        }
        const userExists = await User.findOne({ email: email });
        if (userExists)
            return res
                .status(401)
                .json({ msg: "Account with credentials already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
            bio: "",
            avatar: null,
            cover: null,
            followers: [],
            following: [],
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const query = identifier.includes("@")
            ? { email: identifier }
            : { username: identifier };
        const user = await User.findOne(query).select("+password");
        if (!user) return res.status(401).json({ msg: "Invalid credentials" });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            return res.status(401).json({ msg: "Invalid credentials" });
        const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_SECRET,
            {
                expiresIn: "15m",
            }
        );
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_SECRET,
            {
                expiresIn: "7d",
            }
        );
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        }).cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const userDetails = {
            _id: user._id,
            name: user.name,
            username: user.username,
            friends: user.friends,
            following: user.following,
            followers: user.followers,
            bio: user.bio,
            avatar: user.avatar,
            cover: user.cover,
            createdAt: user.createdAt,
        };
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            msg: "Failed to login",
            error,
        });
    }
};

export const identifyMe = (req, res) => {
    res.status(200).json({ user: req.user });
};

export const logout = async (req, res) => {
    try {
        const user = req.user;
        await User.findByIdAndUpdate(user._id, {
            $set: { refreshToken: null },
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        }).clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        res.status(200).json({ msg: "Logged out successfull" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ msg: "No refresh token" });
        }
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const user = await User.findById(decoded.id).select("+refreshToken");
        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ msg: "Invalid refresh token" });
        }
        const newAccessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_SECRET,
            { expiresIn: "15m" }
        );
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });
        return res.status(200).json({ msg: "Token refreshed" });
    } catch (error) {
        return res.status(403).json({ msg: "Refresh failed" });
    }
};
