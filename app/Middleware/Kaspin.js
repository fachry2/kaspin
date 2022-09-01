'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Kaspin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    const formatResponse = {
      status: 'sucess',
      data: [],
    }

    try {
       let token = await auth.getAuthHeader()
        if (!token) {
          throw new Error('Token not found')
        }
       let c = await auth.check()
        const user = await auth.getUser()
        if (user.role === 'admin') {
          return next()
        }
        throw new Error(JSON.stringify({code: 403 , message:"Permission denied"}))
    } catch (e) {
        let message = e.message
        let code = 401
        if(message.includes('JWT')){
          message = message.split(': ')[1]
        }
        formatResponse.status = message
        return response.status(code).json(formatResponse)
    }
  }
}

module.exports = Kaspin
