import pool from "../config/db.js";

export const getAllTasksService = async () => {
    const result = await pool.query(`SELECT * FROM tasks`);
    return result.rows
}
export const getTaskByIdService = async (id) => {
    const result = await pool.query(`SELECT * FROM tasks WHERE id = $1`);
    return result.rows[0]
}
export const createTaskService = async ( user_id, body, time_begin, time_end ) => {
    const result = await pool.query(`INSERT INTO tasks (user_id, body, time_begin, time_end) VALUES ($1, $2, $3, $4) RETURNING *`, [user_id, body, time_begin, time_end]);
    return result.rows[0]
}
export const updateTaskService = async (body, time_begin, time_end, progression, completion, id) => {
    const result = await pool.query(`UPDATE tasks SET body=$1, time_begin=$2, time_end=$3, progression=$4, completion=$5 WHERE id=$6 RETURNING *`, [body, time_begin, time_end, progression, completion, id]);
    return result.rows[0]
    }
export const deleteTaskService = async (id) => {
    const result = await pool.query(`DELETE FROM tasks WHERE id=$1 RETURNING*`,[id])
    return result.rows[0]
}