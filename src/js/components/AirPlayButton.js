'use strict';

var hasAirPlayAPISupport = require('../lib/hasAirPlayAPISupport'),
    AirPlayButton;

AirPlayButton = {
   constructor: function(options) {
      // TODO internationalization
      this._buttonText = options.buttonText || 'AirPlay';

      this.constructor.super_.apply(this, arguments);

      if (!hasAirPlayAPISupport()) {
         this.hide();
      }

      this._reactToAirPlayAvailableEvents();
   },

   createControlTextEl: function(el) {
      var textEl = document.createElement('span');

      textEl.innerHTML = this._buttonText;
      textEl.className = 'vjs-control-text';

      el.appendChild(textEl);
   },

   buildCSSClass: function() {
      return 'vjs-airplay-button ' + this.constructor.super_.prototype.buildCSSClass();
   },

   handleClick: function() {
      this.player().trigger('airPlayRequested');
   },

   _getMediaEl: function() {
      var playerEl = this.player().el();

      return playerEl.querySelector('video, audio');
   },

   _reactToAirPlayAvailableEvents: function() {
      var mediaEl = this._getMediaEl(),
          self = this;

      if (!mediaEl || !hasAirPlayAPISupport()) {
         return;
      }

      mediaEl.addEventListener('webkitplaybacktargetavailabilitychanged', function(event) {
         if (event.availability === 'available') {
            self.show();
         } else {
            self.hide();
         }
      });
   },
};

module.exports = function(videojs) {
   var AirPlayButtonImpl;

   AirPlayButtonImpl = videojs.extend(videojs.getComponent('Button'), AirPlayButton);
   videojs.registerComponent('airPlayButton', AirPlayButtonImpl);
};
