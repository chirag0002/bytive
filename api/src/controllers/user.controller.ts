import { Request, Response } from "express";
import { User } from "../db/db";
import { v4 as uuid } from "uuid"
import { genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
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

    try {
        const id = uuid();

        const salt = await genSalt()
        const hashedPassword = await hash(password, salt);

        const user = new User({
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

        await user.save()

        const token = sign({ userId: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '12h' });

        res.status(200).json({
            message: "User registered successfully",
            token: token,
            user: {
                id: user.id,
                name: user.name
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const signIn = async (req: Request, res: Response) => {
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

};

export const getAllUser = async (req: Request, res: Response) => {
    const { fieldOfInterest, techStack, dateOfGrad, search } = req.query as { fieldOfInterest?: string, techStack?:string, dateOfGrad?: string, search?: string }
    const query: any = {}

    if (fieldOfInterest !== undefined) query.fieldOfInterest = { $in: [fieldOfInterest] };
    if (techStack !== undefined) query.techStack = { $in: [techStack] };
    if (dateOfGrad !== undefined) query.dateOfGrad = dateOfGrad
    if (search !== undefined) query.name = { $regex: new RegExp(search, 'i') };

    try {
        const users = await User.find(query)
        res.status(200).json({
            users: users
        });
    } catch (err: any) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export const getUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            user: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const {
        name,
        email,
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

    try {
        const user = await User.findOne({ id: userId });
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

        await user.save();

        res.status(200).json({
            message: "User updated successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.findByIdAndDelete(user._id)
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};