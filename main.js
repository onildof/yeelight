/*
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
*/

//the dgram module provides an implementation of UDP sockets
const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.on('error', function (err) {
	console.log(`server error:\n${err.stack}`)
	server.close()
})

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234, () => {
	server.addMembership('239.255.255.250')
})

server.send('M-SEARCH * HTTP/1.1\r\n'+
			'HOST: 239.255.255.250:1982\r\n'+
			'MAN: "ssdp:discover"\r\n'+
			'ST: wifi_bulb\r\n',
			1982,
			'239.255.255.250',
			function (err) {
				if (err)
					console.log(err)
			}
)
