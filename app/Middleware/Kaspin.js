'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Logger = use('Logger')

class Kaspin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    const formatResponse = {
      status: '',
      data: [],
    }

    try {
        const user = await auth.getUser()
        if (user.role === 'admin') {
          Logger.info('request details %j', {
            url: request.url(),
            user: user.username
          })
          return next()
        }
        formatResponse.status = 'Permission denied'
        return response.status(403).json(formatResponse)
    } catch (e) {
        Logger.transport('file').error("Error : ", e)
        formatResponse.status = 'Missing or invalid jwt token'
        return response.status(401).json(formatResponse)
    }
  }
}

module.exports = Kaspin
