import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },

        entity: {
            type: mongoose.SchemaTypes.ObjectId,
            refPath: "entityType",
            required: true,
        },

        entityModel: {
            type: String,
            required: true,
            enum: ["Post", "Comment"],
        },
    },
    { timestamps: true }
);

likeSchema.index(
    {
        user: 1,
        entity: 1,
        entityType: 1,
    },
    { unique: true }
);

const Like = mongoose.model("Like", likeSchema);

export default Like;
