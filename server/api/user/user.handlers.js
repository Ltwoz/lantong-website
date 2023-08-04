const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const User = require("./user.model");
const sendToken = require("../../utils/jwtToken");
const ErrorHandler = require("../../utils/errorHandler");
const ApiFeatures = require("../../utils/apiFeatures");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
    });

    sendToken(user, 201, res);
});

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please Enter Email & Password",
        });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Forgot Password
// Reset Password

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return res.status(400).json({
            success: false,
            message: "Old password is incorrect",
        });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "password does not match",
        });
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user,
    });
});

// Get all users -- Admin
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 20;
    const usersCount = await User.countDocuments();

    const apiFeature = new ApiFeatures(User.find(), req.query)
        .filter()
        .findUser();

    let users = await apiFeature.query;

    let fiteredUsersCount = users.length;

    apiFeature.pagination(resultPerPage);

    users = await apiFeature.query.clone();

    const totalPageCount = Math.ceil(fiteredUsersCount / resultPerPage);

    res.status(200).json({
        success: true,
        users,
        fiteredUsersCount,
        totalPageCount,
        usersCount,
    });
});

// Get single user -- Admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: `User does not exist with Id: ${req.params.id}`,
        });
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({
            success: false,
            message: `User does not exist with Id: ${req.params.id}`,
        });
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});
