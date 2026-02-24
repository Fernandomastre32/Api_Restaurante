const db = require('../Config/db');

class Cliente {
    static async getAll() {
        const query = 'SELECT * FROM cliente ORDER BY cliente_id ASC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM cliente WHERE cliente_id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const { nombre, telefono, email } = data;
        const query = 'INSERT INTO cliente (nombre, telefono, email) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await db.query(query, [nombre, telefono, email]);
        return rows[0];
    }

    static async update(id, data) {
        const { nombre, telefono, email } = data;
        const query = 'UPDATE cliente SET nombre = $1, telefono = $2, email = $3 WHERE cliente_id = $4 RETURNING *';
        const { rows } = await db.query(query, [nombre, telefono, email, id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM cliente WHERE cliente_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Cliente;
