const db = require('../Config/db');

class Pago {
    static async getAll() {
        const query = 'SELECT * FROM pago ORDER BY fecha_pago DESC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM pago WHERE pago_id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const { orden_id, metodo, monto, referencia } = data;
        const query = 'INSERT INTO pago (orden_id, metodo, monto, referencia) VALUES ($1, $2, $3, $4) RETURNING *';
        const { rows } = await db.query(query, [orden_id, metodo, monto, referencia]);
        return rows[0];
    }
}

module.exports = Pago;
