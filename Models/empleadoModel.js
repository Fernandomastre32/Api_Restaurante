const db = require('../Config/db');

class Empleado {
    static async getAll() {
        const query = `
      SELECT e.*, r.nombre as rol_nombre 
      FROM empleado e 
      JOIN rol r ON e.rol_id = r.rol_id 
      ORDER BY e.empleado_id ASC
    `;
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = `
      SELECT e.*, r.nombre as rol_nombre 
      FROM empleado e 
      JOIN rol r ON e.rol_id = r.rol_id 
      WHERE e.empleado_id = $1
    `;
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(empleado) {
        const { nombre, apellido_p, apellido_m, telefono, email, activo, rol_id } = empleado;
        const query = `
      INSERT INTO empleado (nombre, apellido_p, apellido_m, telefono, email, activo, rol_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *
    `;
        const values = [nombre, apellido_p, apellido_m, telefono, email, activo !== undefined ? activo : true, rol_id];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async update(id, empleado) {
        const { nombre, apellido_p, apellido_m, telefono, email, activo, rol_id } = empleado;
        const query = `
      UPDATE empleado 
      SET nombre = $1, apellido_p = $2, apellido_m = $3, telefono = $4, email = $5, activo = $6, rol_id = $7 
      WHERE empleado_id = $8 
      RETURNING *
    `;
        const values = [nombre, apellido_p, apellido_m, telefono, email, activo, rol_id, id];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM empleado WHERE empleado_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Empleado;
