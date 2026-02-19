import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,

    },
    
    resetOtp: {
        type: String,
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },
    otpExpires: {
        type: Date
    }
   
}, { timestamps: true })
userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);
export default User;