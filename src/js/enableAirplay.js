'use strict';

function hasAirplayAPISupport() {
   return !!window.WebKitPlaybackTargetAvailabilityEvent;
}

function getExistingAirplayButton(player) {
   return player.controlBar.getChild('airplayButton');
}

function ensureAirplayButtonExists(player, options) {
   var existingAirplayButton = getExistingAirplayButton(player);

   if (!existingAirplayButton) {
      player.controlBar.addChild('airplayButton', options);
   }
}

function onAirplayRequested(player) {
   var mediaEl = player.el().querySelector('video, audio');

   if (mediaEl && mediaEl.webkitShowPlaybackTargetPicker) {
      mediaEl.webkitShowPlaybackTargetPicker();
   }
}

function listenForAirplayEvents(player) {
   // Respond to requests for airplay. The AirplayButton component triggers this event
   // when the user clicks the airplay button.
   player.on('airplayRequested', onAirplayRequested.bind(null, player));
}

function enableAirplay(options) {
   if (!this.controlBar) {
      return;
   }

   if (hasAirplayAPISupport()) {
      listenForAirplayEvents(this);
      ensureAirplayButtonExists(this, options);
   }
}

module.exports = function(videojs) {
   videojs.registerPlugin('airplay', function(options) {
      // `this` is an instance of a Video.js Player.
      // Wait until the player is "ready" so that the player's control bar component has
      // been created.
      this.ready(enableAirplay.bind(this, options || {}));
   });
};
