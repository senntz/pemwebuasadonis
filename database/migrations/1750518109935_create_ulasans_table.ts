import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ulasans'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('wisata_id').unsigned().notNullable().references('id').inTable('wisatas')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('rating').notNullable()
      table.text('komentar').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}