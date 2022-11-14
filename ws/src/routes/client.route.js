const express = require('express')
const router  = express.Router()

const clientController = require('../api/controllers/client.controller') 


/** AULA **/
router.get('/cliente', async (req, res)=>{
    console.log('Client:: /cliente')
    clientController.get(req, res)
})

/*** AULA ***/
 router.get('/cliente/salao/:salonId', async (req, res)=>{
    console.log('Client:: /cliente/salao/id')
    clientController.getSalonClients(req, res)
})

/*** AULA PAGAR.ME ***/
router.post('/cliente', async (req, res)=>{
    console.log('Client:: /cliente')
    clientController.post(req, res)
})

/*** AULA ***/
 router.put('/cliente/:clientId', async (req, res)=>{
    console.log('Client:: /cliente/clientId')
    clientController.put(req, res)
})


/*** AULA ***/
 router.delete('/cliente/servico/:id', async (req, res)=>{
    console.log('Client:: /cliente/servico/rel_id')
    clientController.deleteById(req, res)
})


/*** AULA REMOVER: EH IGUAL AO get()::find(query) ***/
 router.post('/cliente/filters', async (req, res)=>{
    console.log('Client:: /cliente/filters')
    clientController.filters(req, res)
})


module.exports = router