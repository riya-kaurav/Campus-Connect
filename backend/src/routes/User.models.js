import mongoose from mongoose;
const { Schema } = mongoose;
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
    }
},
    {
        timestamps: true
    }

)


export const User = mongoose.model("User", userSchema)