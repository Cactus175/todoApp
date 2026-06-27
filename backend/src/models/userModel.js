import pool from "../config/db.js";

export const getAllUsersService = async () => {
    const result = await pool.query(`SELECT * FROM "Users"`);
    return result.rows
}
export const getUserByIdService = async (id) => {
    const result = await pool.query(`SELECT * FROM "Users" WHERE id = $1`);
    return result.rows[0]
}
export const createUserService = async (name, email, password) => {
    const result = await pool.query(`INSERT INTO "Users" (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, password]);
    return result.rows[0]
}
export const updateUserService = async (id, name, email) => {
    const result = await pool.query(`UPDATE "Users" SET name=$1 email=$2 WHERE id=$3 RETURNING *`, [name, email, id]);
    return result.rows[0]
    }
export const deleteUserService = async (id) => {
    const result = await pool.query(`DELETE FROM "Users" WHERE id=$1 RETURNING*`,[id])
    return result.rows[0]
}