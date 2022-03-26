import express from "express";
import { homeRouter } from "./home/home.route.js"

export const restRouter = express.Router();
restRouter.use('/home', homeRouter)