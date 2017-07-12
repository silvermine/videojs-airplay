'use strict';

var createAirplayButton = require('./components/AirplayButton'),
    createAirplayPlugin = require('./enableAirplay');

module.exports = function(videojs) {
   createAirplayButton(videojs);
   createAirplayPlugin(videojs);
};
