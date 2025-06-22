import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Role from './role.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Ulasan from './ulasan.js'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare roleId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Role, {
    foreignKey: 'roleId'
  })
  declare role: BelongsTo<typeof Role>

  @hasMany(() => Ulasan)
  declare ulasan: HasMany<typeof Ulasan>
}