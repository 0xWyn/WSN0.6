import mongoose from "mongoose";

const ownershipTransferSchema = new mongoose.Schema(
    {
        clan: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Clan",
        },
        targetUser: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

ownershipTransferSchema.index(
    {
        clan: 1,
        targetUser: 1,
    },
    { unique: true }
);

const ClanOwnershipTransfer = mongoose.model(
    "ClanOwnershipTransfer",
    ownershipTransferSchema
);

export default ClanOwnershipTransfer;
