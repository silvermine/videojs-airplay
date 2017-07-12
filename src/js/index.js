'use strict';

var createAirplayButton = require('./components/AirplayButton'),
    createAirplayPlugin = require('./enableAirplay');

module.exports = function(videojs) {
   videojs = videojs || window.videojs;
   createAirPlayButton(videojs);
   createAirPlayPlugin(videojs);
};
