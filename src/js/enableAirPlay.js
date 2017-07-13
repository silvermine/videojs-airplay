'use strict';

function hasAirPlayAPISupport() {
   return !!window.WebKitPlaybackTargetAvailabilityEvent;
}

function getExistingAirPlayButton(player) {
   return player.controlBar.getChild('airPlayButton');
}

function ensureAirPlayButtonExists(player, options) {
   var existingAirPlayButton = getExistingAirPlayButton(player);

   if (!existingAirPlayButton) {
      player.controlBar.addChild('airPlayButton', options);
   }
}

function onAirPlayRequested(player) {
   var mediaEl = player.el().querySelector('video, audio');

   if (mediaEl && mediaEl.webkitShowPlaybackTargetPicker) {
      mediaEl.webkitShowPlaybackTargetPicker();
   }
}

function listenForAirPlayEvents(player) {
   // Respond to requests for AirPlay. The AirPlayButton component triggers this event
   // when the user clicks the AirPlay button.
   player.on('airPlayRequested', onAirPlayRequested.bind(null, player));
}

function enableAirPlay(options) {
   if (!this.controlBar) {
      return;
   }

   if (hasAirPlayAPISupport()) {
      listenForAirPlayEvents(this);
      ensureAirPlayButtonExists(this, options);
   }
}

module.exports = function(videojs) {
   videojs.registerPlugin('airPlay', function(options) {
      // `this` is an instance of a Video.js Player.
      // Wait until the player is "ready" so that the player's control bar component has
      // been created.
      this.ready(enableAirPlay.bind(this, options || {}));
   });
};
