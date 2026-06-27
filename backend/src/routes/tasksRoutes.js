import express from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/tasksController.js";

const router = express.Router();

router.post("/task", createTask);
router.get("/task", getAllTasks);
router.get("/task/:id", getTaskById);
router.put("/task", updateTask);
router.delete("/task/:id", deleteTask);

export default router;