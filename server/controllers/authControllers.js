import bcrypt from "bcrypt";
import crypto from "crypto";

import errorResponse from "../utils/errorResponse.js";
import User from "../models/userSchema.js";
import { sendEmail } from "../utils/sendMail.js";

/** Signup */
export const Signup = async (req, res, next) => {

    const { username, email, password, cpassword } = req.body;

    // Check: username, email and password is not provided.
    if (!username || !email || !password || !cpassword) {
        return next(new errorResponse("Please provide all fields", 400));
    };

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            return next(new errorResponse("Email already exists", 400));
        } else if (password !== cpassword) {
            return next(new errorResponse("Password confirmation does not match!", 400));
        } else {
            const newUser = new User({
                username, email, password, cpassword 
            });

            const user = await newUser.save();

            // Generate auth token
            const token = user.generateAuthToken();

            res.status(201).json({
                message: "Signup Success",
                user,
                token
            })
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500; 
        }
        next(error);
    }
};

/** Login */
export const Login = async (req, res, next) => { 

    const { email, password } = req.body;
    
    // Check: email and password is not provided.
    if (!email || !password) {
        return next(new errorResponse("Please provide all fields", 400));
    }; 

    try {
        // Check: user already sign up for an account
        const user = await User.findOne({ email: email }).select("+password");

        if (user) {
            // Check: password is matched
            const pwMatch = await bcrypt.compare(password, user.password);

            if (!pwMatch) {
                return next(new errorResponse("Invalid Password", 401));
            } else {
                // Generate auth token
                const token = user.generateAuthToken();

                res.status(200).json({
                    message: "Signup Success",
                    user,
                    token
                })
            }
        } else {
            return next(new errorResponse("The account is not registered!", 401));
        }

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** Forget Password */
export const forgotPassword = async (req, res, next) => {
    // If user exists, send email to provided user email
    const { email } = req.body;

    if (!email) {
        return next(new errorResponse("Invalid email!", 401));
    };

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new errorResponse("Email cannot be sent!", 404));
        }

        // Reset token and again added to database
        const resetToken = user.generateResetToken();

        await user.save();

        // Create reset url and sent mail to user provided email
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        // Customize email message
        const message = `
            <h1>Password Reset</h1>
            <p>
                We have send url to reset your password.
            </p>
            <a href=${resetUrl}>${resetUrl}</a>
            <p>
                Thanks for supporting us.
            </p>
        `

        try {
            sendEmail({
                to: user.email,
                subject: "Reset Password",
                text: message
            })

            res.status(200).json({
                message: "Mail sent" 
            })

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            
            await user.save();

            return next(new errorResponse("Mail cannot be sent!", 500))
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex")

    try {   
        const user = await User.findOne({ 
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return next(new errorResponse("Invalid Token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            message: "Success reset password",
            token: user.generateAuthToken()
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error); 
    }
};