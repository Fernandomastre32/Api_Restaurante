const db = require('../Config/db');

class Mesa {
    static async getAll() {
        const query = 'SELECT * FROM mesa ORDER BY numero ASC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM mesa WHERE mesa_id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const { numero, capacidad, ubicacion, estado } = data;
        const query = 'INSERT INTO mesa (numero, capacidad, ubicacion, estado) VALUES ($1, $2, $3, $4) RETURNING *';
        const { rows } = await db.query(query, [numero, capacidad, ubicacion, estado || 'LIBRE']);
        return rows[0];
    }

    static async update(id, data) {
        const { numero, capacidad, ubicacion, estado } = data;
        const query = 'UPDATE mesa SET numero = $1, capacidad = $2, ubicacion = $3, estado = $4 WHERE mesa_id = $5 RETURNING *';
        const { rows } = await db.query(query, [numero, capacidad, ubicacion, estado, id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM mesa WHERE mesa_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Mesa;
