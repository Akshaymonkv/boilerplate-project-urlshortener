require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const dns = require('dns');
const url = require('url');
const RandomNumber = require('random_numbers_generator')
const { hostname } = require('os');
const isUrl = require('is-url')

// Basic Configuration
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
/*
let short_mem = {
  firstvalue: "",
  secondvalue: ""
}
*/

let short_mem = new Map();


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.post('/api/shorturl',(req,res)=>{
  console.log("Incoming request URL:", req.originalUrl);
  const urlValue = req.body.url
  const x = isUrl(urlValue)
  //console.log('X',x)
  if(x == false){
    res.json({
      error: 'invalid url'
    })
    
  }
  else{
    const parsedUrl = new url.parse(urlValue)
    dns.resolve(parsedUrl.hostname,(err)=>{
      if(err)res.json({error: 'invalid url'})
      else{
        const shortUrl = RandomNumber.getRandomNumber(0,100)
        short_mem.set(shortUrl,urlValue)
        console.log(short_mem)
        res.json({
          original_url: urlValue,
          short_url : shortUrl
        })
      }
    })
  }
}
)

app.get('/api/shorturl/:surl',(req,res)=>{
  console.log(req.params.surl)
  const svalue = parseInt((req.params.surl),10)
  console.log("The s value", svalue);

  const ex = short_mem.get(svalue);
  console.log("Url found:", ex);
  res.redirect(ex); // Redirect to the original URL

})

function randomNumgen(){
  const random_num = RandomNumber.getRandomNumber(1,100)
  return random_num
}



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
