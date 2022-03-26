import { home } from "./home.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { response } from "express";

export const getHomeData = async (req, res) => {
    const getHomeData = await home.find();
    res.send('hehe boi')
}