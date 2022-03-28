import express from "express";
import { getHomeData, insertHomeData } from "./home.controller.js"

export const homeRouter = express.Router();

homeRouter.get("/getHomeData", getHomeData)
homeRouter.post("/insertHomeData", insertHomeData)