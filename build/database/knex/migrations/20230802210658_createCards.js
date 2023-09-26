"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("cards", (table) => {
        table.increments("id");
        table.integer("user_id").references("id").inTable("users");
        table.text("english");
        table.text("portuguese");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("cards");
}
exports.down = down;
