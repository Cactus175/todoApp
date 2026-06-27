import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const handleResponse = (res, status, message, data = null, token = null) => {
    res.status(status).json({
        status,
        message,
        data,
        token
    })
}

export const createUser = async (req, res, next) => {
    const {name, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8)
    try {
        const newUser = await createUserService(name,email, hashedPassword);
        const token = jwt.sign({ id: newUser.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        handleResponse(res, 201, "Created", newUser, token)
    } catch (err) {
        next(err);
    }
};










export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, "Fetched", users)
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req, res, next) => {
    const {id} = req.params.id;
    try {
        const user = await getUserByIdService(id);
        if (!user) return handleResponse(res, 404, "No user")
            handleResponse(res, 200, "Fetched User", user)
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    const {id} = req.params.id;
    const {name, email} = req.body;
    try {
        const updatedUser = await updateUserService(id, name, email);
        if (!user) return handleResponse(res, 404, "No user")
        handleResponse(res, 200, "Updated User", updatedUser)
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    const {id} = req.params.id;
    try {
        const deletedUser = await deleteUserService(id);
        if (!user) return handleResponse(res, 404, "No user")
        handleResponse(res, 200, "Deleted User", deletedUser)
    } catch (err) {
        next(err);
    }
};