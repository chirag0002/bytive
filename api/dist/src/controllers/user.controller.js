"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUser = exports.signIn = exports.signUp = void 0;
const db_1 = require("../db/db");
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, avatar, dateOfGrad, github, linkedin, website, twitter, bio, hireable, seeking, location, fieldOfInterest, techStack } = req.body;
    try {
        const id = (0, uuid_1.v4)();
        const salt = yield (0, bcrypt_1.genSalt)();
        const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
        const user = new db_1.User({
            id: id,
            name: name,
            email: email,
            password: hashedPassword,
            avatar: avatar,
            dateOfGrad: dateOfGrad,
            github: github,
            linkedin: linkedin,
            website: website,
            twitter: twitter,
            bio: bio,
            hireable: hireable,
            seeking: seeking,
            location: location,
            fieldOfInterest: fieldOfInterest,
            techStack: techStack
        });
        yield user.save();
        const token = (0, jsonwebtoken_1.sign)({ userId: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '12h' });
        res.status(200).json({
            message: "User registered successfully",
            token: token,
            user: {
                id: user.id,
                name: user.name
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.token;
    const user = req.user;
    res.status(200).json({
        message: "User signedIn successfully",
        token: token,
        user: {
            id: user.id,
            name: user.name
        }
    });
});
exports.signIn = signIn;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fieldOfInterest, techStack, dateOfGrad, search } = req.query;
    const query = {};
    if (fieldOfInterest !== undefined)
        query.fieldOfInterest = { $in: [fieldOfInterest] };
    if (techStack !== undefined)
        query.techStack = { $in: [techStack] };
    if (dateOfGrad !== undefined)
        query.dateOfGrad = dateOfGrad;
    if (search !== undefined)
        query.name = { $regex: new RegExp(search, 'i') };
    try {
        const users = yield db_1.User.find(query);
        res.status(200).json({
            users: users
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getAllUser = getAllUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield db_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            user: user
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { name, email, avatar, dateOfGrad, github, linkedin, website, twitter, bio, hireable, seeking, location, fieldOfInterest, techStack } = req.body;
    try {
        const user = yield db_1.User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.avatar = avatar || user.avatar;
        user.dateOfGrad = dateOfGrad || user.dateOfGrad;
        user.github = github || user.github;
        user.linkedin = linkedin || user.linkedin;
        user.website = website || user.website;
        user.twitter = twitter || user.twitter;
        user.bio = bio || user.bio;
        user.hireable = hireable || user.hireable;
        user.seeking = seeking || user.seeking;
        user.location = location || user.location;
        user.fieldOfInterest = fieldOfInterest || user.fieldOfInterest;
        user.techStack = techStack || user.techStack;
        yield user.save();
        res.status(200).json({
            message: "User updated successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield db_1.User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield db_1.User.findByIdAndDelete(user._id);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteUser = deleteUser;
