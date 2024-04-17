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
exports.userValidation = void 0;
const validator_1 = require("../validators/validator");
const db_1 = require("../db/db");
const userValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, avatar, dateOfGrad, github, linkedin, website, twitter, bio, hireable, seeking, location, fieldOfInterest, techStack } = req.body;
    const validation = (0, validator_1.userValidator)({
        name,
        email,
        password,
        avatar,
        dateOfGrad,
        github,
        linkedin,
        website,
        twitter,
        bio,
        hireable,
        seeking,
        location,
        fieldOfInterest,
        techStack
    });
    if (!validation.success) {
        const errs = validation.error.errors;
        return res.status(400).json({
            errors: errs.map((err) => ({
                param: err.path[0],
                message: err.message,
                code: "INVALID_INPUT"
            }))
        });
    }
    try {
        const user = yield db_1.User.findOne({
            $or: [
                { email: email },
                { github: github },
                { linkedin: linkedin },
                { website: website },
                { twitter: twitter }
            ]
        });
        if (user) {
            return res.status(400).json({
                status: false,
                errors: [
                    {
                        param: "email",
                        message: "User with this email/github/twitter/linkedin/webiste already exists.",
                        code: "RESOURCE_EXISTS"
                    }
                ]
            });
        }
        else {
            next();
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.userValidation = userValidation;
