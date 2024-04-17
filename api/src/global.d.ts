import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            token: string;
            user: any;
        }
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_KEY: string;
        }
    }
}