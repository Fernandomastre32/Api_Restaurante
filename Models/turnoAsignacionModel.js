const db = require('../Config/db');

class TurnoAsignacion {
    static async getAll() {
        const query = `
      SELECT ta.*, t.nombre as turno_nombre, e.nombre as empleado_nombre, e.apellido_p
      FROM turno_asignacion ta
      JOIN turno t ON ta.turno_id = t.turno_id
      JOIN empleado e ON ta.empleado_id = e.empleado_id
      ORDER BY ta.fecha DESC
    `;
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = `
      SELECT ta.*, t.nombre as turno_nombre, e.nombre as empleado_nombre, e.apellido_p
      FROM turno_asignacion ta
      JOIN turno t ON ta.turno_id = t.turno_id
      JOIN empleado e ON ta.empleado_id = e.empleado_id
      WHERE ta.turno_asignacion_id = $1
    `;
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const { turno_id, empleado_id, fecha } = data;
        const query = 'INSERT INTO turno_asignacion (turno_id, empleado_id, fecha) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await db.query(query, [turno_id, empleado_id, fecha]);
        return rows[0];
    }

    static async update(id, data) {
        const { turno_id, empleado_id, fecha } = data;
        const query = 'UPDATE turno_asignacion SET turno_id = $1, empleado_id = $2, fecha = $3 WHERE turno_asignacion_id = $4 RETURNING *';
        const { rows } = await db.query(query, [turno_id, empleado_id, fecha, id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM turno_asignacion WHERE turno_asignacion_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = TurnoAsignacion;
