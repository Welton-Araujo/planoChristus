const express = require('express')
const router  = express.Router()

const salonController = require('../api/controllers/salon.controller')


/**
 * @Salon
*/
router.get('/salon', async (req, res)=>{
    console.log('Salon: /saloes')
    salonController.get(req, res)
})

/** AULA **
 * @Info url: site.com?lat=-0.00&long=-0.00&filtro=field_1 field_2 ...
 */
router.get('/salao/:id', async (req, res)=>{
    console.log('Salon: /salao/id')
    salonController.getById(req, res)
})

/** AULA **
 * 
 */
 router.post('/salao', async (req, res)=>{
    console.log('Salon: /salao' )
    salonController.post(req, res)
})

router.put('/salon/:id', async (req, res)=>{
    console.log('Salon: /salao/id')
    salonController.put(req, res)    
})

router.delete('/salon/:id', async (req, res)=>{
    console.log('Salon: /salao/id')
    salonController.deleteById(req, res)    
})


/*** AULA SERVICOS ***
 * @services Obter serviços (formatados) do salao.
 */
 router.get('/salao/:salonId/servicos', async (req, res)=>{
    console.log('Salon: /servicos/salonId')
    salonController.getSalonFormattedServices(req, res)
})


module.exports = router