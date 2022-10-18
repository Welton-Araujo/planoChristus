const express = require('express')
const router  = express.Router()

const serviceController = require('../api/controllers/service.controller')



/** AULA ***
 * @ServicesFull Obter serviços (com arquivos) do salao.
 */
router.get('/servico/salao/:salonId', async (req, res)=>{
    console.log('Service: /salao/id', req.params)
    serviceController.getFullSalonServices(req, res)
})

/*** AULA AWS ***
 * @Formdata algumas destas rotas nao usam json (Multidata).
 */
router.post('/servico', async (req, res)=>{
    console.log('Service: /servico (Multidata)' )
    serviceController.post(req, res)
})

/*** AULA AWS ***
 * @Formdata algumas destas rotas nao usam json (Multidata).
 */
router.put('/servico/:id', async (req, res)=>{
    console.log('Service: /servico/id (Multidata)', req.params.id)
    serviceController.put(req, res)
})

/*** AULA ***
 * 
 */
router.delete('/servico/:referenceId/deletar-arquivo', async (req, res)=>{
    console.log('Service: /servico/referenceId/deletar-arquivo')
    serviceController.deleteFile(req, res)
})

/*** AULA ***
 * 
 */
router.delete('/servico/arquivo/:id', async (req, res)=>{    
    console.log('Service: /arquivo/id', req.params.id)
    serviceController.deleteFileById(req, res)
})


module.exports = router