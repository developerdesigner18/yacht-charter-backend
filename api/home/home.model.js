import mongoose from 'mongoose';
import pkg from 'mongoose';
const { Schema } = pkg;

const homeSchema = Schema({
    media: [{
        landing_video: String,
        image_1: String
    }],
    content: [{
        tagLine: String,
        heading_1: String,
        description_1: String,
        heading_2: String,
        sub_heading_2: String,
        description_2: String,
        heading_3: String,
        description_3: String,
    }]
}, {
    timestamps: true
})

export const home = mongoose.model('home', homeSchema)