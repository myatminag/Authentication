import jwt from "jsonwebtoken";

import User from "../models/userSchema.js";
import errorResponse from "../utils/errorResponse.js";

export const authMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);

        if (!token) {
            return next(new errorResponse("Unauthorized to access this routes", 401))
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(decode.id);

            if (!user) {
                return next(new errorResponse("No user is found on this id!", 404));
            }

            req.user = user;
            next();
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500; 
            }
            next(error);
        }
    }
};