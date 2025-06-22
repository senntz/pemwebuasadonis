/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', ({ response }) => response.redirect('/login'))
router.get('/login', '#controllers/auth_controller.showLogin')
router.post('/login', '#controllers/auth_controller.login')
router.get('/register', '#controllers/auth_controller.showRegister')
router.post('/register', '#controllers/auth_controller.register')
router.get('/logout', '#controllers/auth_controller.logout')
router.get('/wisata', '#controllers/dashboard_controller.userDashboard')
router.post('/wisata', '#controllers/dashboard_controller.userDashboard')
router.get('/wisata/:id', '#controllers/wisatas_controller.index')
router.post('/wisata/:id', '#controllers/wisatas_controller.storeUlasan')
router.get('/admin', '#controllers/dashboard_controller.adminDashboard',)
router.post('/admin/:id', '#controllers/wisatas_controller.destroy')
router.get('/admin/kategori', '#controllers/kategoris_controller.index')
router.post('/admin/kategori/store', '#controllers/kategoris_controller.store')
router.get('/admin/kota', '#controllers/kotas_controller.index')
router.post('/admin/kota/store', '#controllers/kotas_controller.store')
router.get('/admin/wisata', '#controllers/wisatas_controller.createIndex')
router.post('/admin/wisata/store', '#controllers/wisatas_controller.store')
