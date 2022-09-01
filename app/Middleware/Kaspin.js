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
        const user = await auth.getUser()
        if (user.role === 'admin') {
          return next()
        }
        throw new Error(JSON.stringify({code: 403 , message:"Permission denied"}))
    } catch (e) {
        formatResponse.status = 'Missing or invalid jwt token'
        return response.status(401).json(formatResponse)
    }
  }
}

module.exports = Kaspin
