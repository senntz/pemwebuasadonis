import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, computed, hasMany } from '@adonisjs/lucid/orm'
import Kota from './kota.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Kategori from './kategori.js'
import Ulasan from './ulasan.js'

export default class Wisata extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare namaWisata: string

  @column()
  declare deskripsi: string

  @column()
  declare kotaId: number

  @column()
  declare kategoriId: number

  @column()
  declare biayaMasuk: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Kota, {
    foreignKey: 'kotaId'
  })
  declare kota: BelongsTo<typeof Kota>

  @belongsTo(() => Kategori, {
    foreignKey: 'kategoriId'
  })
  declare kategori: BelongsTo<typeof Kategori>

  @hasMany(() => Ulasan)
  declare ulasan: HasMany<typeof Ulasan>

  @computed()
  get averageRating() {
    if (this.ulasan && this.ulasan.length > 0) {
      const total = this.ulasan.reduce((sum, ulasan) => sum + ulasan.rating, 0)
      return (total / this.ulasan.length).toFixed(1)
    }
    return '0.0'
  }
}