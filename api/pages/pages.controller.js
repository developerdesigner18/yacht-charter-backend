import { Pages } from "./pages.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { response } from "express";

// get all home page data
export const getHomeData = async (req, res) => {
    try {
        const data = await Pages.findOne({page: "Home"});
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'home page data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: data,
                length: data.length,
                message: 'home page data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'pages.controller: home' + err.message
        })
    }
}

// update home page data
export const updateHomeData = async (req, res) => {
    try {
        // const { userId } = req.body;
        // const { company, position, city, description, fromdate, todate } = req.body
        // var data = content;
        // const home = new Home(data);
        // home.save()
        const page_id = req.query.pid
        const content = req.body
        const media = req.files

        const currentData = await Pages.findById(page_id).lean().exec();
        let landing_video;
        let image_1;
        media.landing_video ? landing_video = media.landing_video != undefined ? media.landing_video[0].filepath + media.landing_video[0].filename : ''
                            : landing_video = currentData.media?.landing_video
        media.image_1 ? image_1 = media.image_1 != undefined ? media.image_1[0].filepath + media.image_1[0].filename : ''
                      : image_1 = currentData.media?.image_1
        const data = {
            media: {
                landing_video: landing_video,
                image_1: image_1
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
        const homeData = await Pages.findByIdAndUpdate(page_id, data, {new: true})
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: homeData,
            message: 'home page content updated successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'pages.controller: home' + err.message
        });
    }
}

// get all q-spd page data
export const getQSpdData = async (req, res) => {
    try {
        const data = await Pages.findOne({page: "Q-Spd"});
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'q-spd page data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: data,
                length: data.length,
                message: 'q-spd page data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'pages.controller: q-spd' + err.message
        })
    }
}

// update q-spd page data
export const updateQSpdData = async (req, res) => {
    try {
        // const { userId } = req.body;
        // const { company, position, city, description, fromdate, todate } = req.body
        // var data = content;
        // const home = new Home(data);
        // home.save()

        const page_id = req.query.pid
        const content = req.body
        const media = req.files
        const data = {
            cover_image: media.cover_image != undefined ? media.cover_image[0].filename : '',
            price: content.price,
        };

        for(let i = 0; i < media.images.length; i++) {
            data.images.push({name: media.images[i].filepath + media.images[i].filename})
        }

        // checkUserData(userId);
        const qSpdData = await Pages.findByIdAndUpdate(page_id, data, {new: true})
        // addData(userId, data, "work");

        res.status(201).send({
            success: true,
            data: qSpdData,
            message: 'q-spd page content updated successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'pages.controller: q-spd' + err.message
        });
    }
}