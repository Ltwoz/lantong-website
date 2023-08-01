const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "กรุณาใส่ชื่อผู้ใช้งาน"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "กรุณาใส่อีเมล"],
        match: [/\S+@\S+\.\S+/, "อีเมลไม่ถูกต้อง"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "กรุณาใส่รหัสผ่าน"],
        minLength: [8, "รหัสผ่านจำเป็นต้องใส่อย่างน้อย 8 ตัว"],
        select: false,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
