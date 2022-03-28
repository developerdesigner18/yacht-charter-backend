import { Home } from "./home.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { response } from "express";

// get all home page data
export const getHomeData = async (req, res) => {
    try {
        const data = await Home.find({});
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'Home page data not found'
            })
        }
        else {
            res.status(201).send({
                success: true,
                data: data,
                length: data.length,
                message: 'Home page data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: err.message
        })
    }
}

// insert home page data
export const insertHomeData = async (req, res) => {
    try {
        // const { userId } = req.body;
        // const { company, position, city, description, fromdate, todate } = req.body
        // var data = content;
        // const home = new Home(data);
        // home.save()

        const content = req.body
        const page_id = content.page_id
        const data = {
            page: "Home",
            media: {
                landing_video: content.landing_video,
                image_1: content.image_1
            },
            content: {
                tag_line: content.tag_line,
                heading_1: content.heading_1,
                description_1: content.description_1,
                heading_2: content.heading_2,
                sub_heading_2: content.sub_heading_2,
                description_2: content.description_2,
                heading_3: content.heading_3,
                description_3: content.description_3,
            },
        };

        // checkUserData(userId);
        console.log('data', data);
        const homeData = await Home.findByIdAndUpdate(page_id, data)
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            message: 'home page content updated successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: err.message
        });
    }
}