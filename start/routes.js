'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.get('api/kaspin/v1/get-token', 'KaspinController.getToken')

Route.group(() => {
  Route.get('alamat/:id', 'KaspinController.findDataById')
  Route.get('alamat/kecamatan/:kota_id', 'KaspinController.findDataByKotaId')
}).prefix('api/kaspin/v1').middleware('kaspin')