const path = require('path')
const express = require('express')

const app = express()
const server = require('http').createServer(app)

app.use('/pdf', express.static(path.join(__dirname, 'pdf')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(3000, () => {
  console.log('run server')
})


const cdnApp = express()
const cdnServer = require('http').createServer(cdnApp)

cdnApp.use('/cdn', express.static(path.join(__dirname, 'pdf'),
{
  setHeaders(res){
    console.log(2)
    res.setHeader('Access-Control-Allow-Origin', '*')
  }
}
));

cdnServer.listen(3100, () => {
  console.log('run cdn server')
})