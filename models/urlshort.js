const mongoose = require('mongoose');
 

// Schema tells structure of document(database)
const UrlSchema = mongoose.Schema({
    longUrl : {
     type : String,
    required : true

},
shortUrl : {
    type : String,
    unique : true
},
clickCount :{
    type : Number,
    default : 0
}

})


const UrlModel = mongoose.model('urlshort', UrlSchema);

module.exports = { UrlModel };
