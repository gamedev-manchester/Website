"use strict";

const Flickr = require("flickr-sdk");
const Instagram = require('node-instagram').default;
// var Instafeed = require("instafeed");

const galleryHelpers = require('../helpers/GalleryHelpers');

// Fetches the galleries from the Flickr API
exports.getGalleries = (callback) => {

  const instagram = new Instagram({
    clientId: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
  });

  // Get the most recent media published by the owner of the access_token.
  instagram.get('users/self/media/recent').then(data => {
      try {
          const galleries = galleryHelpers.parseInstagramResponse(data);
          console.log(galleries,'oi')
          return callback(null, galleries);
      } catch (err) {
          return callback(`Could not parse Instagram API response: ${err}`, null);
      }
  }).catch(err => {
      return callback(`Could download gallery Instagram Flickr API: ${err}`, null);
  });

};


