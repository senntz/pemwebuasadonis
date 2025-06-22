import Kategori from '#models/kategori'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class KategorisController {
    async index({ view, session }: HttpContext) {
        const userId = session.get('user_id')
        const user = await User.find(userId)

        return view.render('pages/admin/create-kategori', { 
            user,
            currentRoute: 'kategori'
        })
    }

    async store({request, response}: HttpContext) {
        const namaKategori = request.input('namaKategori')
        
        await Kategori.create({
            namaKategori: namaKategori
        })
        return response.redirect('/admin')
    }
}