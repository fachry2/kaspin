'use strict'

class KaspinController {
	async getToken ({ request, response, auth }) {
	        let token = await auth.generate({ id: 99 }, false, { expiresIn: '7d'})
	    return response.json(token)
	}
}

module.exports = KaspinController
