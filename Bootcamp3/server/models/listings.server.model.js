//You can replace this entire file with your Bootcamp Assignment #2 - ListingSchema.js File

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  /* your code here from Bootcamp Assignment #2 - ListingSchema.js File*/
  code: String,
  name: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  address: String 
});

/* create a 'pre' function that adds the updated_at and created_at if not already there property */
listingSchema.pre('save', function(next, err) {
  /* your code here from Bootcamp Assignment #2 - ListingSchema.js File */
  if (!this.name || !this.code){
    next(err);
  }
  else{
  var currentDate = new Date();
  this.updated_at = currentDate;
  if(!this.created_at)
    this.created_at = currentDate;
    next();
  }
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
