const db = require('../Config/db');

class Compra {
    static async getAll() {
        const query = 'SELECT * FROM compra ORDER BY fecha_compra DESC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const queryCompra = 'SELECT * FROM compra WHERE compra_id = $1';
        const queryDetalles = `
      SELECT cd.*, i.nombre as insumo_nombre, i.unidad 
      FROM compra_detalle cd 
      JOIN insumo i ON cd.insumo_id = i.insumo_id 
      WHERE cd.compra_id = $1
    `;

        const compraRes = await db.query(queryCompra, [id]);
        if (compraRes.rows.length === 0) return null;

        const detallesRes = await db.query(queryDetalles, [id]);

        const compra = compraRes.rows[0];
        compra.detalles = detallesRes.rows;
        return compra;
    }
}

module.exports = Compra;
