const db = require('../Config/db');

class Turno {
    static async getAll() {
        const query = 'SELECT * FROM turno ORDER BY turno_id ASC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM turno WHERE turno_id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const { nombre, hora_inicio, hora_fin } = data;
        const query = 'INSERT INTO turno (nombre, hora_inicio, hora_fin) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await db.query(query, [nombre, hora_inicio, hora_fin]);
        return rows[0];
    }

    static async update(id, data) {
        const { nombre, hora_inicio, hora_fin } = data;
        const query = 'UPDATE turno SET nombre = $1, hora_inicio = $2, hora_fin = $3 WHERE turno_id = $4 RETURNING *';
        const { rows } = await db.query(query, [nombre, hora_inicio, hora_fin, id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM turno WHERE turno_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Turno;
