import type { HttpContext } from '@adonisjs/core/http'
import Kategori from "#models/kategori"
import Kota from "#models/kota"
import User from "#models/user"
import Wisata from "#models/wisata"
import Ulasan from '#models/ulasan'

export default class DashboardController {
    async userDashboard({ view, session, response, request }: HttpContext) {
        const userId = session.get('user_id')
        
        const user = await User.find(userId)
        if (!user) {
            return response.redirect('/login')
        }

        const { kotaId, biayaMax } =  request.only(['kotaId', 'biayaMax'])

        console.log(kotaId)
        console.log(biayaMax)

        let query = Wisata.query()
        .preload('kota')
        .preload('kategori')
        .preload('ulasan')

        if (kotaId) {
        query = query.where('kota_id', kotaId)
        }

        if (biayaMax) {
        query = query.where('biaya_masuk', '<=', biayaMax)
        }

        const kotas = await Kota.all()
        const wisatas = await query.exec()

        return view.render('pages/user/dashboard', {
        user,
        kotas,
        wisatas,
        currentRoute: 'dashboard',
        filter: {kotaId, biayaMax}
        })
    }

    async adminDashboard({ view, session, response }: HttpContext) {
        const userId = session.get('user_id')
        const roleId = session.get('user_role')

        const user = await User.find(userId)
        if (!roleId) {
            return response.redirect('/login')
        }

        let query = Wisata.query()
        .preload('kota')
        .preload('kategori')
        .preload('ulasan')

        const wisatas = await query.exec()

        const totalKota = await Kota.query().count('* as total')
        const totalKategori = await Kategori.query().count('* as total')
        const totalWisata = await Wisata.query().count('* as total')
        const totalUlasan = await Ulasan.query().count('* as total')


        
        return view.render('pages/admin/dashboard', {
        user,
        wisatas,
        totalKota,
        currentRoute: 'admin',
        panel: {
            totalKota: Number(totalKota[0].$extras.total) || 0,
            totalKategori: Number(totalKategori[0].$extras.total) || 0,
            totalWisata: Number(totalWisata[0].$extras.total) || 0,
            totalUlasan: Number(totalUlasan[0].$extras.total) || 0,
        }
        })
    }
}