import mongoose from "mongoose";
const { Schema } = mongoose;
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""

    },
    year: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    buddyConnections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    age: {
        type: Number,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }


},
    {
        timestamps: true
    }

)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();



})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)