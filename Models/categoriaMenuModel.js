const db = require('../Config/db');

class CategoriaMenu {
    static async getAll() {
        const query = 'SELECT * FROM categoria_menu ORDER BY categoria_id ASC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM categoria_menu WHERE categoria_id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const { nombre } = data;
        const query = 'INSERT INTO categoria_menu (nombre) VALUES ($1) RETURNING *';
        const { rows } = await db.query(query, [nombre]);
        return rows[0];
    }

    static async update(id, data) {
        const { nombre } = data;
        const query = 'UPDATE categoria_menu SET nombre = $1 WHERE categoria_id = $2 RETURNING *';
        const { rows } = await db.query(query, [nombre, id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM categoria_menu WHERE categoria_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = CategoriaMenu;
