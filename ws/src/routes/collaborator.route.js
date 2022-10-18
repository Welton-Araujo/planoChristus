const express = require('express')
const router  = express.Router()

const collaboratorController = require('../api/controllers/collaborator.controller') 


 router.get('/colaborador', async (req, res)=>{
    console.log('Collaborator:: /colaborador')
    collaboratorController.get(req, res)
})

/*** AULA ***
 * 
 */
 router.get('/colaborador/salao/:salonId', async (req, res)=>{
    console.log('Collaborator:: /colaborador/salao/id')
    collaboratorController.getById(req, res)
})

/*** AULA PAGAR.ME ***
 * 
 */
router.post('/colaborador', async (req, res)=>{
    console.log('Collaborator:: /colaborador')
    collaboratorController.post(req, res)
})

/*** AULA ***
 * 
 */
 router.put('/colaborador/:collaboratorId', async (req, res)=>{
    console.log('Collaborator:: /colaborador/collaboratorId')
    collaboratorController.put(req, res)
})


/*** AULA ***
 * 
 */
 router.delete('/colaborador/servico/:id', async (req, res)=>{
    console.log('Collaborator:: /colaborador/servico/rel_id')
    collaboratorController.deleteById(req, res)
})


/*** AULA REMOVER: EH IGUAL AO get()::find(query)***
 * 
 */
 router.post('/colaborador/filters', async (req, res)=>{
    console.log('Collaborator:: /colaborador/filters')
    collaboratorController.filters(req, res)
})


module.exports = router