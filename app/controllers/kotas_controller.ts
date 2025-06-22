import Kota from '#models/kota'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class KotasController {
    async index({ view, session }: HttpContext) {
        const userId = session.get('user_id')
        const user = await User.find(userId)

        return view.render('pages/admin/create-kota', { 
            user,
            currentRoute: 'kota'
        })
    }

    async store({request, response}: HttpContext) {
        const namaKota = request.input('namaKota')
        
        await Kota.create({
            namaKota: namaKota
        })
        return response.redirect('/admin')
    }
}