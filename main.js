const path = require('path')
const express = require('express')
const app = express()
const port = 8282

app.use('/public', express.static(path.join(__dirname,'public')))

app.listen(port, () => console.log("Servidor HTTP escutando na porta "+port))