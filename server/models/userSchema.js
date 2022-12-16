import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minLength: 6
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });

/** Hash Password */
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.password, 12);
    };
    next();
});

/** Generate Token */
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id }, 
        process.env.JWT_SECRET_KEY, 
        {  expiresIn: "1d" }
    );
};

/** Generate Password Token */
userSchema.methods.generateResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and save to database
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

    return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;