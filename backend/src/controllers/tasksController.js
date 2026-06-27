import { createTaskService, deleteTaskService, getAllTasksService, getTaskByIdService, updateTaskService } from "../models/tasksModel.js";


const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

export const createTask = async (req, res, next) => {
    const {user_id, body, time_begin, time_end} = req.body;
    try {
        const newTask = await createTaskService(user_id, body, time_begin, time_end);
        handleResponse(res, 201, "Created", newTask)
    } catch (err) {
        next(err);
    }
};
export const getAllTasks = async (req, res, next) => {
    // const {user_id} = req.body
    try {
        const tasks = await getAllTasksService();
        handleResponse(res, 200, "Fetched", tasks)
    } catch (err) {
        next(err);
    }
};

export const getTaskById = async (req, res, next) => {
    const {id} = req.params.id;
    try {
        const task = await getTaskByIdService(id);
        if (!task) return handleResponse(res, 404, "No task")
            handleResponse(res, 200, "Fetched task", task)
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req, res, next) => {
    const {body, time_begin, time_end, progression, completion, id} = req.body;
    try {
        const task = await updateTaskService(body, time_begin, time_end, progression, completion, id);
        if (!task) return handleResponse(res, 404, "No task")
        handleResponse(res, 200, "Updated task", task)
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req, res, next) => {
    const {id} = req.params.id;
    try {
        const deletedTask = await deleteTaskService(id);
        if (!task) return handleResponse(res, 404, "No task")
        handleResponse(res, 200, "Deleted task", deletedTask)
    } catch (err) {
        next(err);
    }
};