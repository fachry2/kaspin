'use strict'
const User = use('App/Models/User')

class AuthController {
	async login ({ request, response, auth }) {
	   let {email, password} = request.all();
    
        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let token = await auth.generate(user)
    
            Object.assign(user, token)
            return response.json(user)
          }
    
    
        }
        catch (e) {
          return response.json({message: 'Email not found'})
        }
	}
}

module.exports = AuthController
