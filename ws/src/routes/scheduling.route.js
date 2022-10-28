const express = require('express')
const router  = express.Router()

const schedulingController =require('../api/controllers/scheduling.controller') 

/** AULA **
 *
*/
router.get('/agendamento', async (req, res)=>{
    console.log('Scheduling:: /agendamento')
    schedulingController.get(req, res)
})

/** AULA **
 *
*
router.get('/agendamento/salao/:salonId', async (req, res)=>{
    console.log('Scheduling:: /agendamento/salao/id')
    schedulingController.getSalonSchedules(req, res)
})

/** AULA **
 *
*
router.get('/agendamento/:id', async (req, res)=>{
    console.log('Scheduling:: /agendamento')
    schedulingController.getById(req, res)
})

/** AULA **
 *
*/
router.post('/agendamento', async (req, res)=>{
    console.log('Scheduling:: /agendamento')
    schedulingController.post(req, res)
})

/** AULA **
 *
*
router.post('/agendamento/colaboradores', async (req, res)=>{
    console.log('Scheduling:: /agendamento/colaboradores')
    schedulingController.postCollaboratorSchedules(req, res)
})

/** AULA **
 *
*
router.put('/agendamento/:id', async (req, res)=>{
    console.log('Scheduling:: /agendamento/id')
    schedulingController.put(req, res)
})

/** AULA **
 *
*
router.delete('/agendamento/:id', async (req, res)=>{
    console.log('Scheduling:: /agendamento/id')
    schedulingController.deleteById(req, res)
})/** */

/*** AULA REMOVER: EH IGUAL AO get()::find(query)***
 * 
 */
router.post('/agendamento/filters', async (req, res)=>{
    console.log('Scheduling:: /agendamento/filters')
    schedulingController.filters(req, res)
})

module.exports = router