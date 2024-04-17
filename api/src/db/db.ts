import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

if(!process.env.DB) throw new Error('DB not defined');

mongoose.connect(process.env.DB);

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        maxlength: 64,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        maxlength: 128,
        required: true,
        trim: true
    }, 
    password: {
        type: String,
        maxlength: 64,
        required: true,
    },
    avatar:{
        type: String,
        default: 'https://imgs.search.brave.com/NNqmLl--yA-qoIMCty9nsvqWhEA4yWud-oEGnbBAwbg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzAzLzQ0LzUz/LzM2MF9GXzUwMzQ0/NTM4N19DbVNtZXB3/MmFXZlZjbFZEVGNK/SHFMNjYyZUF3d1Rh/by5qcGc'
    },
    dateOfGrad: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true,
        unique: true
    },
    twitter: {
        type: String,
        required: true,
        unique: true
    },
    linkedin: {
        type: String,
        required: true,
        unique: true
    },
    website: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    hireable: {
        type: Boolean,
        required: true
    },
    fieldOfInterest: {
        type: Array,
        required: true
    },
    techStack: {
        type: Array,
        required: true
    },
    seeking: {
        type: Array,
        required: true
    }
});


export const User = mongoose.model('User', userSchema);