import { searchDB } from "../controllers/searchController.js";
import express from "express";

const searchRouter = express.Router();

searchRouter.post("/", searchDB);

export default searchRouter;
