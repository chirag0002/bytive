import { NextFunction, Request, Response } from "express";
import { userValidator } from "../validators/validator";
import { User } from "../db/db";


export const userValidation = async (req: Request, res: Response, next: NextFunction) => {
    const {
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
    } = req.body;

    const validation = userValidator({
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
            errors: errs.map((err: any) => ({
                param: err.path[0],
                message: err.message,
                code: "INVALID_INPUT"
            }))
        });
    }

    try {
        const user = await User.findOne({ 
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
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}