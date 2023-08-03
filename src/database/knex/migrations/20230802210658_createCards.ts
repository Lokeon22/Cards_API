import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cards", (table) => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.text("portuguese");
    table.text("english");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cards");
}
