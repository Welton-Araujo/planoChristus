const mongoose = require('mongoose')
const URI = process.env.URI_MONGOBD

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopoLogy', true)

mongoose.connect(URI)
    .then(resp=>console.log('MongoDB is UP!',resp))
    .catch(err=>console.log('MongoDB erro:',err))