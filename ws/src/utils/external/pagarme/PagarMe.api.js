/**
 * @Pagarme Comunicação diretamente com a API Pagar.me:
*/

const axios = require('axios')
const { PAGARME } = require('../../../config')

const api_key           = PAGARME.API_KEY
const CREATE_ACCOUNTS   = PAGARME.ENDPOINT_CREATE_ACCOUNTS
// console.log('PAGARME...', PAGARME)

const pagarMeApi = axios.create({
    baseUrl: PAGARME.URI,
})


/**
 * 
 * @param {*} data {...}
 * @param {*} endpoint string
 * @returns Promise {error,data}
 */
module.exports = async (data, endpoint=CREATE_ACCOUNTS) => {
    try {
        //POST:
        const response = await pagarMeApi.post(endpoint,{
            api_key,
            ... data
        })
        return { error: false, data: response.data }
    } catch (error) {
        return { 
            error: true, 
            message: { input:error.input, code:error.code }
        }
    }
}


