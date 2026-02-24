const db = require('../Config/db');

class Platillo {
    static async getAll() {
        const query = `
      SELECT p.*, c.nombre as categoria_nombre 
      FROM platillo p 
      JOIN categoria_menu c ON p.categoria_id = c.categoria_id 
      ORDER BY p.platillo_id ASC
    `;
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = `
      SELECT p.*, c.nombre as categoria_nombre 
      FROM platillo p 
      JOIN categoria_menu c ON p.categoria_id = c.categoria_id 
      WHERE p.platillo_id = $1
    `;
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(data) {
        const { categoria_id, nombre, descripcion, precio, disponible } = data;
        const query = 'INSERT INTO platillo (categoria_id, nombre, descripcion, precio, disponible) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const { rows } = await db.query(query, [categoria_id, nombre, descripcion, precio, disponible !== undefined ? disponible : true]);
        return rows[0];
    }

    static async update(id, data) {
        const { categoria_id, nombre, descripcion, precio, disponible } = data;
        const query = 'UPDATE platillo SET categoria_id = $1, nombre = $2, descripcion = $3, precio = $4, disponible = $5 WHERE platillo_id = $6 RETURNING *';
        const { rows } = await db.query(query, [categoria_id, nombre, descripcion, precio, disponible, id]);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM platillo WHERE platillo_id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Platillo;
