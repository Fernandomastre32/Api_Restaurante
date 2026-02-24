const db = require('../Config/db');

class RecetaIngrediente {
    static async getByPlatillo(platilloId) {
        const query = `
      SELECT r.*, i.nombre as insumo_nombre, i.unidad 
      FROM receta_ingrediente r
      JOIN insumo i ON r.insumo_id = i.insumo_id
      WHERE r.platillo_id = $1
    `;
        const { rows } = await db.query(query, [platilloId]);
        return rows;
    }

    static async create(data) {
        const { platillo_id, insumo_id, cantidad } = data;
        const query = 'INSERT INTO receta_ingrediente (platillo_id, insumo_id, cantidad) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await db.query(query, [platillo_id, insumo_id, cantidad]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM receta_ingrediente WHERE receta_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = RecetaIngrediente;
