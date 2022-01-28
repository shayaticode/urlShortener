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
}

})


const UrlModel = mongoose.model('urlshort', UrlSchema);

module.exports = { UrlModel };
