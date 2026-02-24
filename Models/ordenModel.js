const { pool } = require('../Config/db'); // We exported { query } but we need pool here. Oops, let's just modify db.js or re-import pg pool here.

const db = require('../Config/db');

// Actually, in db.js we just exported `query` method. Let's create an export of the pool as well to do transactions. 
// For now we will rely on a new connection handling method or update Config/db.js in the next step.

class Orden {
    static async getAll() {
        const query = 'SELECT * FROM orden ORDER BY fecha_apertura DESC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const queryOrden = 'SELECT * FROM orden WHERE orden_id = $1';
        const queryDetalles = `
      SELECT od.*, p.nombre as platillo_nombre 
      FROM orden_detalle od 
      JOIN platillo p ON od.platillo_id = p.platillo_id 
      WHERE od.orden_id = $1
    `;

        const ordenRes = await db.query(queryOrden, [id]);
        if (ordenRes.rows.length === 0) return null;

        const detallesRes = await db.query(queryDetalles, [id]);

        const orden = ordenRes.rows[0];
        orden.detalles = detallesRes.rows;
        return orden;
    }

    // La transaccion se implementará usando las funciones base o modificando db.js
    // Para mantener compatibilidad si no modificamos db.js aun:
    // Se pasará el client de DB desde el controller
}

module.exports = Orden;
