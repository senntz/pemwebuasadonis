import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {

    async showLogin({ view }: HttpContext) {
        return view.render('pages/auth/login')
    }

    async showRegister({ view }: HttpContext) {
        return view.render('pages/auth/register')
    }
    
    async login({ request, response, session }: HttpContext) {
        const { email, password } =  request.only(['email', 'password'])

        const user = await User.findBy('email', email)

        if (!user) {
            return response.redirect().back()
        }

        const isPasswordValid = await hash.verify(user.password, password)

        if (!isPasswordValid) {
            return response.redirect().back()
        }

        session.put('user_id', user.id)
        session.put('user_role', user.roleId)

        if (user.roleId === 1) {
            return response.redirect('/admin')
        } else {
            return response.redirect('/wisata')
        }
    }

    async register({ request, response }: HttpContext) {
        const { nama, email, password } = request.only(['nama', 'email', 'password'])

        const existingUser = await User.findBy('email', email)
        
        if (existingUser) {
            return response.redirect().back()
        }

        await User.create({
            nama,
            email,
            password: await hash.make(password),
        })

        return response.redirect('/login')
    }

    async logout({ response, session }: HttpContext) {
        session.forget('user_id')
        session.forget('user_role')
        
        return response.redirect('/login')
    }
}