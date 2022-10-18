const express = require('express')
const router  = express.Router()

const scheduleController =require('../api/controllers/schedule.controller') 

/** AULA **
 *
*/
router.get('/horario', async (req, res)=>{
    console.log('Schedule:: /horarios')
    scheduleController.get(req, res)
})

/** AULA **
 *
*/
router.get('/horario/salao/:salonId', async (req, res)=>{
    console.log('Schedule:: /horarios/salao/id')
    scheduleController.getSalonSchedules(req, res)
})

/** AULA **
 *
*/
router.get('/horario/:id', async (req, res)=>{
    console.log('Schedule:: /horarios')
    scheduleController.getById(req, res)
})

/** AULA **
 *
*/
router.post('/horario', async (req, res)=>{
    console.log('Schedule:: /horarios')
    scheduleController.post(req, res)
})

/** AULA **
 *
*/
router.post('/horario/colaboradores', async (req, res)=>{
    console.log('Schedule:: /horarios/colaboradores')
    scheduleController.postCollaboratorSchedules(req, res)
})

/** AULA **
 *
*/
router.put('/horario/:id', async (req, res)=>{
    console.log('Schedule:: /horarios/id')
    scheduleController.put(req, res)
})

/** AULA **
 *
*/
router.delete('/horario/:id', async (req, res)=>{
    console.log('Schedule:: /horarios/id')
    scheduleController.deleteById(req, res)
})


module.exports = router