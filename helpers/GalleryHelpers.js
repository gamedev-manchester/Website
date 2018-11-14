// Helper functions for the Gallery page
"use strict";

exports.parseInstagramResponse = (data) => {
  try{
    const images = data.data.map(g => {
      return {
        description: g.caption.text,
        link: g.images.standard_resolution.url,
        thumbUrl: g.images.thumbnail.url
      }
    })
    return images;
  } catch (err) {
    throw new Error(`Could not parse instagram response: ${err}`);
  }
}