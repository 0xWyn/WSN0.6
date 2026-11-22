import mongoose from "mongoose";

const blockBanSchema = new mongoose.Schema(
    {
        entity: {
            type: mongoose.SchemaTypes.ObjectId,
            refPath: "entityType",
            required: true,
        },
        entityType: {
            type: String,
            enum: ["Clan", "User"],
            required: true,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

blockBanSchema.index(
    {
        entity: 1,
        entityType: 1,
        user: 1,
    },
    { unique: true }
);

const BlockBan = mongoose.model("BlockBan", blockBanSchema);

export default BlockBan;
