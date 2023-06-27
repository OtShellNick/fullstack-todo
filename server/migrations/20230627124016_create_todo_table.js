/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('todo', tableBuilder => {
        tableBuilder.increments('id').primary();
        tableBuilder.integer('userId').references('id').inTable('user').onDelete('cascade').onUpdate('cascade');
        tableBuilder.string('name', 96).notNullable();
        tableBuilder.boolean('isDone').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('todo');
};
