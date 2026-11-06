import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        bio: {
            type: String,
            default: "",
        },
        dateOfBirth: {
            type: String,
            default: null,
        },
        avatar: {
            url: { type: String, default: null },
            type: { type: String, default: null },
            publicId: { type: String, default: null },
            _id: false,
        },
        cover: {
            url: { type: String, default: null },
            type: { type: String, default: null },
            publicId: { type: String, default: null },
            _id: false,
        },
        followerCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        followingCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        isPrivate: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            default: null,
            select: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

userSchema.index(
    {
        name: "text",
        username: "text",
        bio: "text",
    },
    {
        weights: {
            username: 10,
            name: 5,
            bio: 1,
        },
    }
);

export default User;
