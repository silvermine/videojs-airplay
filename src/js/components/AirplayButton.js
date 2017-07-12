'use strict';

var AirplayButton;

AirplayButton = {
   constructor: function(options) {
      // TODO internationalization
      this._buttonText = options.buttonText || 'Airplay';

      this.constructor.super_.apply(this, arguments);

      if (!this._hasAirplayAPISupport()) {
         this.hide();
      }

      this._reactToAirplayAvailableEvents();
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
      this.player().trigger('airplayRequested');
   },

   _getMediaEl: function() {
      var playerEl = this.player().el();

      return playerEl.querySelector('video, audio');
   },

   _hasAirplayAPISupport: function() {
      return !!window.WebKitPlaybackTargetAvailabilityEvent;
   },

   _reactToAirplayAvailableEvents: function() {
      var mediaEl = this._getMediaEl(),
          self = this;

      if (!mediaEl || !this._hasAirplayAPISupport()) {
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
   var AirplayButtonImpl;

   AirplayButtonImpl = videojs.extend(videojs.getComponent('Button'), AirplayButton);
   videojs.registerComponent('airplayButton', AirplayButtonImpl);
};
