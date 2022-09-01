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
      status: 'failed',
      message: '',
      data: [],
    }

    try {
        const user = await auth.getUser()
        if (user.role === 'admin') {
          return next()
        }
        formatResponse.message = 'Permission denied'
        return response.status(403).json(formatResponse)
    } catch (e) {
        formatResponse.message = 'Missing or invalid jwt token'
        return response.status(401).json(formatResponse)
    }
  }
}

module.exports = Kaspin
