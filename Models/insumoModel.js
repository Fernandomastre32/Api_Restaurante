const db = require('../Config/db');

class Insumo {
    static async getAll() {
        const query = 'SELECT * FROM insumo ORDER BY insumo_id ASC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM insumo WHERE insumo_id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const { nombre, unidad, stock_actual, stock_minimo, activo } = data;
        const query = 'INSERT INTO insumo (nombre, unidad, stock_actual, stock_minimo, activo) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const { rows } = await db.query(query, [nombre, unidad, stock_actual || 0, stock_minimo || 0, activo !== undefined ? activo : true]);
        return rows[0];
    }

    static async update(id, data) {
        const { nombre, unidad, stock_actual, stock_minimo, activo } = data;
        const query = 'UPDATE insumo SET nombre = $1, unidad = $2, stock_actual = $3, stock_minimo = $4, activo = $5 WHERE insumo_id = $6 RETURNING *';
        const { rows } = await db.query(query, [nombre, unidad, stock_actual, stock_minimo, activo, id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM insumo WHERE insumo_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Insumo;
