'use strict';

var createAirPlayButton = require('./components/AirPlayButton'),
    createAirPlayPlugin = require('./enableAirPlay');

module.exports = function(videojs) {
   videojs = videojs || window.videojs;
   createAirPlayButton(videojs);
   createAirPlayPlugin(videojs);
};
