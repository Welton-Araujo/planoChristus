const express = require('express')
const router  = express.Router()

// const apiController = require('../api/controllers/api.controller') 


/*** API ***
 * 
 */
router.post('/upload', async (req, res)=>{
    console.log('API:: /upload', req.body)
    // api.post(req, res)
    res.json({ok:1})
})


module.exports = router