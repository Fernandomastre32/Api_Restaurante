const db = require('../Config/db');

class Rol {
    static async getAll() {
        const query = 'SELECT * FROM rol ORDER BY rol_id ASC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM rol WHERE rol_id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(rol) {
        const { nombre, descripcion } = rol;
        const query = 'INSERT INTO rol (nombre, descripcion) VALUES ($1, $2) RETURNING *';
        const { rows } = await db.query(query, [nombre, descripcion]);
        return rows[0];
    }

    static async update(id, rol) {
        const { nombre, descripcion } = rol;
        const query = 'UPDATE rol SET nombre = $1, descripcion = $2 WHERE rol_id = $3 RETURNING *';
        const { rows } = await db.query(query, [nombre, descripcion, id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM rol WHERE rol_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Rol;
