const path = require('path')
const express = require('express')
const app = express()
const port = 8282
var ejs = require('ejs');

// handle ejs pages
app.engine(".html", ejs.__express);
app.set("view engine", "html");

app.use('/public', express.static(path.join(__dirname,'public')))
app.use('/images', express.static(path.join(__dirname,'public', 'images')))

app.get('/', function (req, res) {
	res.render('index.html')
})

app.listen(port, () => console.log("Servidor HTTP escutando na porta "+port))