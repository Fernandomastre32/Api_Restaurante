const db = require('../Config/db');

class Proveedor {
    static async getAll() {
        const query = 'SELECT * FROM proveedor ORDER BY proveedor_id ASC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM proveedor WHERE proveedor_id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const { nombre, telefono, email, rfc, direccion } = data;
        const query = 'INSERT INTO proveedor (nombre, telefono, email, rfc, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const { rows } = await db.query(query, [nombre, telefono, email, rfc, direccion]);
        return rows[0];
    }

    static async update(id, data) {
        const { nombre, telefono, email, rfc, direccion } = data;
        const query = 'UPDATE proveedor SET nombre = $1, telefono = $2, email = $3, rfc = $4, direccion = $5 WHERE proveedor_id = $6 RETURNING *';
        const { rows } = await db.query(query, [nombre, telefono, email, rfc, direccion, id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM proveedor WHERE proveedor_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Proveedor;
