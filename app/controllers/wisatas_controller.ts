import Kategori from '#models/kategori'
import Kota from '#models/kota'
import Ulasan from '#models/ulasan'
import User from '#models/user'
import Wisata from '#models/wisata'
import type { HttpContext } from '@adonisjs/core/http'

export default class WisatasController {
    async index({ params, view, session }: HttpContext) {
        const wisata = await Wisata.query()
        .where('id', params.id)
        .preload('kota')
        .preload('kategori')
        .preload('ulasan', (query) => {
            query.preload('user')
        })
        .firstOrFail()

        const userId = session.get('user_id')
        const user = await User.find(userId)

        return view.render('pages/user/tampil-wisata', { wisata, user })
    }

    async storeUlasan({ request, response, session }: HttpContext) {
        const userId = session.get('user_id')
        const {wisata_id, rating, komentar} = request.only(['wisata_id', 'rating', 'komentar'])

        await Ulasan.create({
            wisataId: wisata_id,
            userId,
            rating,
            komentar
        })

        session.flash('success', 'berhasil menambah komentar')
        return response.redirect().back()
    }

    async createIndex({ view, session }: HttpContext) {
        const userId = session.get('user_id')
        const user = await User.find(userId)
        const kota = await Kota.all()
        const kategori = await Kategori.all()
        return view.render('pages/admin/create-wisata', { 
            user,
            kota, 
            kategori,
            currentRoute: 'wisata'
        })
    }

    async store({ request, response }: HttpContext) {
        const namaWisata = request.input('namaWisata')
        const deskripsi = request.input('deskripsi')
        const kotaId = request.input('kotaId')
        const kategoriId = request.input('kategoriId')
        const biayaMasuk = request.input('biayaMasuk')

        await Wisata.create({
            namaWisata: namaWisata,
            deskripsi: deskripsi,
            kotaId: kotaId,
            kategoriId: kategoriId,
            biayaMasuk: biayaMasuk
        })

        return response.redirect('/admin/wisata')
    }

    async destroy({ params, response}: HttpContext) {
        const wisata = await Wisata.find(params.id)
        if (wisata) {
            await wisata.delete()
        }
        return response.redirect('/admin')
    }
}