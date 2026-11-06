import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        follower: {
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
        user: 1,
        follower: 1,
    },
    { unique: true }
);

followSchema.index({
    follower: 1,
    createdAt: -1,
});

const Follow = mongoose.model("Follow", followSchema);

export default Follow;
