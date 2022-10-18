/**
 * @PagarMe Modulo pode conter tratamentos, padronizações, etc, antes da comunicação com a Pagar.me via PagarMe.api.
 */

const pagarme = require('./PagarMe.api')
const { PAGARME } = require('../../../config')

const RECIPIENT = PAGARME.ENDPOINT_RECEIVER


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


module.exports = {

    createAccountPagarme,

}