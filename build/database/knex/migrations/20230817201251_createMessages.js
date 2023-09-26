"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("messages", (table) => {
        table.integer("chatId").references("id").inTable("chat");
        table.integer("sender_id").references("id").inTable("users");
        table.integer("receive_id").references("id").inTable("users");
        table.text("message");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("messages");
}
exports.down = down;
