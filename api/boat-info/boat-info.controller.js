import { BoatInfo } from "./boat-info.model.js"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { response } from "express";

// get all boat-info data
export const getBoatInfoAll = async (req, res) => {
    try {
        const data = await BoatInfo.find().select([
            'cover_image',
            'boat_type',
            'boat_info.name',
            'boat_info.width',
            'boat_info.manufacturer',
            'boat_info.mfg_year',
            'boat_info.mfg_year',
            'status'
        ]);
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'boat-info data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: data,
                length: data.length,
                message: 'boat-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        })
    }
}

// get active boat-info data
export const getActiveBoatInfoAll = async (req, res) => {
    try {
        const data = await BoatInfo.find({status: 'active'}).select([
            'cover_image',
            'boat_type',
            'boat_info.name',
            'boat_info.width',
            'boat_info.manufacturer',
            'boat_info.mfg_year',
            'boat_info.mfg_year',
            'status'
        ]);
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'boat-info data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: data,
                length: data.length,
                message: 'boat-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        })
    }
}

export const getBoatInfoAllByType = async (req, res) => {
    var btype = decodeURIComponent(req.query?.btype)
    try {
        const data = await BoatInfo.find({boat_type: btype, status: 'active'}).select([
            'cover_image',
            'boat_type',
            'boat_info.name',
            'boat_info.width',
            'boat_info.manufacturer',
            'boat_info.mfg_year',
            'boat_info.mfg_year',
            'status'
        ]);
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'boat-info data not found'
            })
        }
        else {
            res.status(200).send({
                success: true,
                data: data,
                length: data.length,
                message: 'boat-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        })
    }
}

// get boat-info data by id
export const getBoatInfoById = async (req, res) => {
    try {
        const boat_id = req.query.bid

        const data = await BoatInfo.findById(boat_id);
        if (data <= 0) {
            res.status(401).send({
                success: false,
                message: 'boat-info data not found'
            })
        }
        else {
            res.status(201).send({
                success: true,
                data: data,
                length: data.length,
                message: 'boat-info data fetched successfully'
            })
        }
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        })
    }
}

// insert boat-info page data
export const insertBoatInfo = async (req, res) => {
    try {
        const content = req.body
        const media = req.files

        const data = new BoatInfo({
            cover_image: media.cover_image != undefined ? media.cover_image[0].filepath + media.cover_image[0].filename : '',
            boat_type: content.boat_type,
            boat_info: {
                name: content.name,
                width: content.width,
                mfg_year: content.mfg_year,
                manufacturer: content.manufacturer,
                guest_capacity: content.guest_capacity,
                crew_capacity: content.crew_capacity,
                engine_type: content.engine_type,
                top_speed: content.top_speed,
                interior: content.interior,
                exterior: content.exterior,
                price: content.price,
            },
            status: 'active'
        })
        
        for(let i = 0; i < media.boat_images.length; i++) {
            data.boat_images.push({name: media.boat_images[i].filepath + media.boat_images[i].filename})
        }
        const boatInfoData = await BoatInfo.create(data)
        res.status(201).send({
            success: true,
            data: boatInfoData,
            message: 'boat-info inserted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        });
    }
}

// update boat-info page data
export const updateBoatInfo = async (req, res) => {
    try {
        const boat_id = req.query.bid
        const content = req.body
        const media = req.files

        const currentData = await BoatInfo.findById(boat_id).lean().exec();
        let cover_image;
        cover_image = media.cover_image != undefined
                        ? media.cover_image[0].filepath + media.cover_image[0].filename
                        : currentData.cover_image;
        const data = {
            _id: boat_id,
            cover_image: cover_image,
            boat_type: content.boat_type,
            boat_info: {
                name: content.name,
                width: content.width,
                mfg_year: content.mfg_year,
                manufacturer: content.manufacturer,
                guest_capacity: content.guest_capacity,
                crew_capacity: content.crew_capacity,
                engine_type: content.engine_type,
                top_speed: content.top_speed,
                interior: content.interior,
                exterior: content.exterior,
                price: content.price,
            },
            status: currentData.status
        }

        let boatInfoData;
        boatInfoData = await BoatInfo.findByIdAndUpdate(boat_id, data, {new: true})
        if (media?.boat_images) {
            for (let i= 0; i< media.boat_images.length; i++) {
                boatInfoData = await BoatInfo.findByIdAndUpdate(boat_id, {$push: {boat_images: {"name": media.boat_images[i].filepath + media.boat_images[i].filename }}}, {new: true})
            }
        }

        res.status(201).send({
            success: true,
            data: boatInfoData,
            message: 'boat-info updated successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        });
    }
}

// update boat status
export const changeBoatStatus = async (req, res) => {
    try {
        console.log(req.query);
        const boat_id = req.query.bid
        const status = req.query.status
        const boatInfoData = await BoatInfo.findByIdAndUpdate(boat_id, {$set : {status: status}}, {new: true})
        
        res.status(201).send({
            success: true,
            data: boatInfoData,
            message: 'boat status changed successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        });
    }
}

// delete single image from boat
export const deleteBoatImage = async (req, res) => {
    try {
        const boat_id = req.query.bid
        const image_id = req.query.iid
        const boatInfoData = await BoatInfo.findByIdAndUpdate(boat_id, {$pull : {boat_images: {_id : image_id}}}, {new: true})
        res.status(201).send({
            success: true,
            data: boatInfoData,
            message: 'boat image deleted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        });
    }
}

// delete boat info
export const deleteBoatInfo = async (req, res) => {
    try {
        const boat_id = req.query.bid
        const boatInfoData = await BoatInfo.findByIdAndDelete(boat_id)
        res.status(201).send({
            success: true,
            data: boatInfoData,
            message: 'boat deleted successfully',
        })
    }
    catch (err) {
        res.status(401).send({
            success: false,
            message: 'boat-info.controller: ' + err.message
        });
    }
}