'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const jwt = require('jsonwebtoken')
const Env = use('Env')

class Kaspin {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({
        request,
        response,
        auth
    }, next) {
        const formatResponse = {
            status: 'sucess',
            data: [],
        }
        const userKaspin = {
          id: 1
        }
        try {
            let token = await auth.getAuthHeader()
            if (!token) {
              throw new Error('Unauthorized user')
            }
            const jwtCheck = await jwt.verify(token, Env.get('APP_KEY'))
            if (jwtCheck.uid === userKaspin.id) {
              return next()
            }
            throw new Error(JSON.stringify({code: 403 , message:"Permission denied"}))
        } catch (e) {
          console.log(e)
            let message = e.message
            let code = 401
            if(message.includes('code')){
              const objError = JSON.parse(message)
              code = objError.code
              message = objError.message
            }
            formatResponse.status = message
            return response.status(code).json(formatResponse)
        }
    }
}
module.exports = Kaspin