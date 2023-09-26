"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.text("name");
        table.text("email");
        table.text("password");
        table.text("avatar").defaultTo(null);
        table.text("background").defaultTo(null);
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("users");
}
exports.down = down;
