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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(`${process.cwd()}/public`));

let short_mem = {
  firstvalue: "",
  secondvalue: ""
}


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.post('/api/shorturl',(req,res)=>{
  const urlValue = req.body.url
  const x = isUrl(urlValue)
  console.log('X',x)
  if(x == false){
    res.json({
      error: 'Invalid Url'
    })
    
  }
  else{
    dns.resolve(urlValue.hostname,(err)=>{
      if(err)res.json({error: 'Invalid Url'})
      else{
        
      }
    })
  }


  const parsedUrl = new url.parse(urlValue)
}
)
/*
function storageFun(ogurl,newurl){
  const short_mem = {
    firstvalue: ogurl,
    secondvalue: newurl
  }
  console.log(short_mem)
}
*/


app.get('/api/shorturl/:shorturl',(req,res)=>{
  const svalue = req.params.shorturl
  if(svalue == short_mem.secondvalue){
    res.redirect(short_mem.firstvalue)
  }
})

function randomNumgen(){
  const random_num = RandomNumber.getRandomNumber(1,100)
  return random_num
}



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
