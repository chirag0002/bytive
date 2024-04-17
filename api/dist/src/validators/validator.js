"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignInValidator = exports.userValidator = void 0;
const zod_1 = __importDefault(require("zod"));
const userSignUpSchemaObject = zod_1.default.object({
    name: zod_1.default.string().min(2).max(64),
    email: zod_1.default.string().email().max(128),
    password: zod_1.default.string().min(6).max(64),
    avatar: zod_1.default.string().optional(),
    dateOfGrad: zod_1.default.coerce.date(),
    github: zod_1.default.string(),
    twitter: zod_1.default.string(),
    linkedin: zod_1.default.string(),
    website: zod_1.default.string(),
    bio: zod_1.default.string(),
    location: zod_1.default.string(),
    hireable: zod_1.default.boolean(),
    fieldOfInterest: zod_1.default.array(zod_1.default.string()),
    techStack: zod_1.default.array(zod_1.default.string()),
    seeking: zod_1.default.array(zod_1.default.string()),
});
const userSignInSchemaObject = zod_1.default.object({
    email: zod_1.default.string().email().max(128),
    password: zod_1.default.string().min(6).max(64)
});
const userValidator = (_a) => {
    var data = __rest(_a, []);
    const response = userSignUpSchemaObject.safeParse(Object.assign({}, data));
    return response;
};
exports.userValidator = userValidator;
const userSignInValidator = ({ email, password }) => {
    const response = userSignInSchemaObject.safeParse({ email, password });
    return response;
};
exports.userSignInValidator = userSignInValidator;
