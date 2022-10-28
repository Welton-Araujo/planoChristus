/**
 * @PagarMe Modulo pode conter tratamentos, padronizações, etc, antes da comunicação com a Pagar.me via PagarMe.api.
 */

const pagarme = require('./PagarMe.api')
const { toCents } = require('../../operations/monetary')
const { PAGARME } = require('../../../config')

const CUSTOMER          = PAGARME.ENDPOINT_CUSTOMER
const TRANSACTIONS      = PAGARME.ENDPOINT_TRANSACTIONS
const APP_FEE           = PAGARME.APP_FEE
const APP_RECIPIENT_ID  = PAGARME.APP_RECIPIENTID


/**
 * 
 * @param {*} bankAccount 
 * @returns 
 */
const createAccountPagarme = async(bankAccount)=>{
    console.log('Pagarme::createAccountPagarme:')
    try {
        //CRIAR CONTA NO Pagar.me:
        const pagarmeBankAccount = await pagarme({
            agencia:         bankAccount.agency,
            bank_code:       bankAccount.bank,
            conta:           bankAccount.number,
            conta_dv:        bankAccount.dv,
            type:            bankAccount.type,
            document_number: bankAccount.cpfCnpj,
            legal_name:      bankAccount.owner,
        })        
        //ERRO AO CRIAR CONTA Pagar.me:
        if(pagarmeBankAccount.error){ throw pagarmeBankAccount }

        //CRIAR RECEBEDOR:
        const pagarmeRecipient = await pagarme({
            transfer_interval:  'daily',
            transfer_enabled:   true,
            bank_account_id:  pagarmeBankAccount.id,
        }, RECIPIENT)
        //ERROR AO CRIAR RECEBEDOR:
        if(pagarmeRecipient.error){ throw pagarmeRecipient  }

        return pagarmeRecipient 
    } catch (error) {
        return { ...error }
    }
}

/**
 * 
 * @param {*} _id 
 * @param {*} client 
 * @returns 
 */
const createCustomerPagarme = async (_id, client)=>{
    console.log('Pagarme::customer', _id)
    try {
        //CRIAR CONTA NO Pagar.me:
        const pagarmeCustomer = await pagarme({
            external_id:    _id,
            name:           client.naem,
            country:        client.address.country,
            email:          client.email,
            type:           client.document.type === 'cpf' ? 'individual' : 'corporation',
            documents:[
                { 
                    type: client.document.type, 
                    numebr: client.document.number 
                }
            ],
            phone_numbers:        [client.phone],
            birthday: client.dateBirth,
            legal_name:      client.owner,
        }, CUSTOMER)        
        //ERRO AO CRIAR CONTA Pagar.me:
        if(pagarmeCustomer.error){ throw pagarmeCustomer }


        return pagarmeCustomer
    } catch (error) {
        return { error:true, message:error.message, client:null }
    }

}

/**
 * 
 * @param {*} Object { creditCard, client, salon, service, collaborator }
 * @returns Promise {error, data}
 */
const createPayment = async ({ creditCard, client, salon, service, collaborator })=>{
    console.log('Pagarme::createPayment', client.id)
    try {
        //FINAL PRICE:
        const finalPrice = toCents(service.price)// $49.90 => 4990
        //COLLABORATOR RULE:
        const collaboratorSplitRule = {
            recipient_id: collaborator.recipientId,
            amount: parseInt(finalPrice * (service.commission / 100))
        }

        const payment = {
            //PRECO TOTAL
            "amount": finalPrice,

            //DADOS DO CARTAO:
            "card_number":          creditCard.number,
            "card_cvv":             creditCard.ccv,
            "card_expiration_date": creditCard.expirationDate,
            "card_holder_name":     creditCard.HolderName,
            
            //DADOS DO CARTAO:
            "customer": {
              "id": client.customerId,              
            },

            //DADOS DO ENDERECO DO CLIENTE:
            "billing": {
              "name": client.name,
              "address": {
                "country":          client.address.country,
                "state":            client.address.state,
                "city":             client.address.city,
                "neighborhood":     client.address.district,
                "street":           client.address.road,
                "street_number":    client.address.number,
                "zipcode":          client.address.zipcode
              }
            },

            //DADOS DO Itens:
            "items": [
              {
                "id": service.id,
                "title": service.title,
                "unit_price": finalPrice,
                "quantity": 1,
                "tangible": false
              }
            ],
            split_rules:[
                //TAXA SALAO
                {
                    recipient_id: salon.recipientId,
                    amount: finalPrice - APP_FEE - collaboratorSplitRule.amount
                },
                //TAXA COLABORADOR
                collaboratorSplitRule,
                //TAXA APP
                {
                    recipient_id: APP_RECIPIENT_ID,
                    amount: APP_FEE
                },
            ],
        }

        const pagarmePayment = await pagarme(payment, TRANSACTIONS)
        return pagarmePayment
    } catch (error) {
        return { error:true, message:error.message, payment:null }        
    }
}


module.exports = {

    createAccountPagarme,
    createCustomerPagarme,
    createPayment,

}