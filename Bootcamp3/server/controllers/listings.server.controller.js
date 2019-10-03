
/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
    coordinates = require('./coordinates.server.controller.js');
    
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions refer back to this tutorial 
  https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
  or
  https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
  

  If you are looking for more understanding of exports and export modules - 
  https://www.sitepoint.com/understanding-module-exports-exports-node-js/
  or
  https://adrianmejia.com/getting-started-with-node-js-modules-require-exports-imports-npm-and-beyond/
 */

/* Create a listing */
try{
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);
  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }
 
  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
      console.log(listing)
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {
  var listing = req.listing;
  if (!listing.code){
    throw err;
  }
  else {
    var updated = new Listing(req.body);
    if (listing.address && req.results){
      Listing.findOneAndUpdate({_id:listing._id},
        {
          'code':updated.code,
          'name':updated.name,
          'address':updated.address,
          'coordinate':{
            latitude:req.results.latitude,
            longitude:req.results.longitude,
          }
        },
      function (err) {
        //Check for an error
        if (err)
        res.send(err);
        else{
          //new building info output to page
          res.send(updated);
          //console.log(req)
        }

        });
    }
    else{
      //if no req.results and address, just update what is available
      Listing.findOneAndUpdate({_id:listing._id},
        {
          'code':updated.code,
          'name':updated.name,
          'address':updated.address,
        },
      function (err) {
        //Check for an error
        if (err)
        res.send(err);
        else{
          //new building info output to page
          res.send(updated);
          //console.log(req)
        }

        });
    }
    
  }
  /* Replace the listings's properties with the new properties found in req.body */
 
  /*save the coordinates (located in req.results if there is an address property) */
 
  /* Save the listing */

};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;
  /* Add your code to remove the listins */
  Listing.findByIdAndRemove(listing._id, function (err, listing) {
    if (err) return handleError(err);
    console.log(listing);
    res.send(listing);
  });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /* Add your code */
  Listing.find({}, function (err, listing) {
    if (err) return handleError(err);
    //console.log(listing);
    res.send(listing);
  }); //add sorted functionality
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      console.log(err)
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};
}
catch(err){
  console.log(err);
}