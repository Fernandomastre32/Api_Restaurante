const db = require('../Config/db');

class InventarioMovimiento {
    static async getAll() {
        const query = `
      SELECT im.*, i.nombre as insumo_nombre, i.unidad 
      FROM inventario_movimiento im
      JOIN insumo i ON im.insumo_id = i.insumo_id
      ORDER BY im.fecha DESC
    `;
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = `
      SELECT im.*, i.nombre as insumo_nombre, i.unidad 
      FROM inventario_movimiento im
      JOIN insumo i ON im.insumo_id = i.insumo_id
      WHERE im.movimiento_id = $1
    `;
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        // Para simplificar, asumimos que crear el movimiento tmb podría afectar el stock de insumo
        // Idealmente requeriría una transacción, pero implementamos el insert básico primero
        const { insumo_id, tipo, cantidad, referencia, notas } = data;
        const query = 'INSERT INTO inventario_movimiento (insumo_id, tipo, cantidad, referencia, notas) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const { rows } = await db.query(query, [insumo_id, tipo, cantidad, referencia, notas]);
        return rows[0];
    }
}

module.exports = InventarioMovimiento;
