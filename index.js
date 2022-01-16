const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 8000;


 mongoose.connect(process.env.DB||"mongodb://127.0.0.1:27017/myUrlShortener", { useNewUrlParser: true, useUnifiedTopology: true });

const { UrlModel } = require('./models/urlshort');

// Middleware
app.use(express.static('public'));
app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  let allUrl = UrlModel.find((err, result)=>{
    res.render('home', {
      urlResult : result
    })
  })
  ;   
});

app.post('/create', (req, res) => {

    
    let urlShort = new UrlModel({
      longUrl : req.body.longurl,
      shortUrl : generateUrl()
    })
    urlShort.save(function(err, data){
      if(err) throw err;
      res.redirect('/');
    })
});

app.get('/:urlId', (req,res)=>{
  UrlModel.findOne({shortUrl : req.params.urlId}, (err, data)=>{
    //if(err) throw err;

    UrlModel.findByIdAndUpdate({_id: data?.id}, {$inc:{clickCount : 1}}, (err,data)=>{
      //if(err) throw err;
    res.redirect(data?.longUrl);

    })
    
  })
})

app.get('/delete/:id', (req, res)=>{
  UrlModel.findByIdAndDelete({_id:req?.params?.id}, (err,deleteData)=>{
    if(err) throw err;
    res.redirect('/');
  })
})

app.listen(process.env.PORT ||port, () => {
  console.log('port is running in 8000')
});

function generateUrl(){
  var rndResult = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  for(i=0; i<6; i++){
    rndResult += characters.charAt(Math.floor(Math.random()*charactersLength));
  }
  console.log(rndResult);
  return rndResult;
}
