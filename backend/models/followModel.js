import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
    {
        following: { type: mongoose.Schema.Types.ObjectId, required: true },
        followers: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

followSchema.index(
    {
        follower: 1,
        following: 1,
    },
    { unique: true }
);

followSchema.index({
    following: 1,
    createdAt: -1,
});

const Follow = mongoose.model("Follow", followSchema);

export default Follow;
