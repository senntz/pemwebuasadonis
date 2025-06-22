import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wisatas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama_wisata').notNullable()
      table.text('deskripsi').notNullable()
      table.integer('kota_id').unsigned().notNullable().references('id').inTable('kotas')
      table.integer('kategori_id').unsigned().notNullable().references('id').inTable('kategoris')
      table.integer('biaya_masuk').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}