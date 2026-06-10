import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

export const searchDB = async (req, res) => {
    console.log("Hit search routes controller");
    const { term } = req.body;

    const users = await User.find(
        {
            $or: [{ name: term }, { username: term }],
        },
        { name: 1, username: 1 }
    );

    res.status(200).json(users);
};
