import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
