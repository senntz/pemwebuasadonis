import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Wisata from './wisata.js'

export default class Ulasan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare wisataId: number

  @column()
  declare userId: number

  @column()
  declare rating: number

  @column()
  declare komentar: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId'
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Wisata, {
    foreignKey: 'wisataId'
  })
  declare wisata: BelongsTo<typeof Wisata>
}