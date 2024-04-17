import zod from 'zod';

const userSignUpSchemaObject = zod.object({
    name: zod.string().min(2).max(64),
    email: zod.string().email().max(128),
    password: zod.string().min(6).max(64),
    avatar: zod.string().optional(),
    dateOfGrad: zod.coerce.date(),
    github: zod.string(),
    twitter: zod.string(),
    linkedin: zod.string(),
    website: zod.string(),
    bio: zod.string(),
    location: zod.string(),
    hireable: zod.boolean(),
    fieldOfInterest: zod.array(zod.string()),
    techStack: zod.array(zod.string()),
    seeking: zod.array(zod.string()),
});

const userSignInSchemaObject = zod.object({
    email: zod.string().email().max(128),
    password: zod.string().min(6).max(64)
})


export const userValidator = ({ ...data }) => {
    const response = userSignUpSchemaObject.safeParse({ ...data });
    return response;
};

export const userSignInValidator = ({ email, password }: { email: string, password: string }) => {
    const response = userSignInSchemaObject.safeParse({ email, password });
    return response;
};