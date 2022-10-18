const express = require('express')
const router  = express.Router()

const scheduleController =require('../api/controllers/schedule.controller') 

/** AULA **
 *
*/
router.get('/horarios', async (req, res)=>{
    console.log('Schedule:: /horarios')
    scheduleController.get(req, res)
})

router.get('/horarios/:id', async (req, res)=>{
    console.log('Schedule:: /horarios')
    scheduleController.getById(req, res)
})

router.post('/horarios', async (req, res)=>{
    console.log('Schedule:: /horarios')
    scheduleController.post(req, res)
})


module.exports = router