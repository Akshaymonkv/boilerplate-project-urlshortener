require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const dns = require('dns');
const url = require('url');
const RandomNumber = require('random_numbers_generator')
const { hostname } = require('os');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl',(req,res)=>{
 const {body} = req
 //console.log(body.url)
 const parsedUrl = url.parse(body.url)
 //console.log(parsedUrl.hostname)
 //checking if url is valid
 dns.resolve(parsedUrl.hostname,(err)=>{
  if(err){res.json({error: 'Invalid URL'})}
  //if valid
  else{
    const extUrlValue = randomNumgen()
     
     res.json({
      original_url: body.url,
      short_url: extUrlValue
     })
     
  }
 })
  }
)

function randomNumgen(){
  const random_num = RandomNumber.getRandomNumber(1,100)
  return random_num
}

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
