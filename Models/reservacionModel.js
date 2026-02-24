const db = require('../Config/db');

class Reservacion {
    static async getAll() {
        const query = `
      SELECT r.*, c.nombre as cliente_nombre, m.numero as mesa_numero 
      FROM reservacion r 
      JOIN cliente c ON r.cliente_id = c.cliente_id 
      LEFT JOIN mesa m ON r.mesa_id = m.mesa_id
      ORDER BY r.fecha_hora ASC
    `;
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = `
      SELECT r.*, c.nombre as cliente_nombre, m.numero as mesa_numero 
      FROM reservacion r 
      JOIN cliente c ON r.cliente_id = c.cliente_id 
      LEFT JOIN mesa m ON r.mesa_id = m.mesa_id
      WHERE r.reservacion_id = $1
    `;
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const { cliente_id, mesa_id, fecha_hora, personas, estado, notas } = data;
        const query = 'INSERT INTO reservacion (cliente_id, mesa_id, fecha_hora, personas, estado, notas) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const { rows } = await db.query(query, [cliente_id, mesa_id || null, fecha_hora, personas, estado || 'PROGRAMADA', notas]);
        return rows[0];
    }

    static async update(id, data) {
        const { mesa_id, fecha_hora, personas, estado, notas } = data; // Usually we don't change the client
        const query = 'UPDATE reservacion SET mesa_id = $1, fecha_hora = $2, personas = $3, estado = $4, notas = $5 WHERE reservacion_id = $6 RETURNING *';
        const { rows } = await db.query(query, [mesa_id, fecha_hora, personas, estado, notas, id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM reservacion WHERE reservacion_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Reservacion;
