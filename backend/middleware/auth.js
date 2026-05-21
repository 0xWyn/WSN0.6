import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ msg: "Not authenticated" });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }
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
        req.user = userDetails;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};
