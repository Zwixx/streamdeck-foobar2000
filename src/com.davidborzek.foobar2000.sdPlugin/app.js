/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />
/// <reference path="plugin/js/actions/playpause.js" />
/// <reference path="plugin/js/actions/pause.js" />
/// <reference path="plugin/js/actions/play.js" />
/// <reference path="plugin/js/actions/stop.js" />
/// <reference path="plugin/js/actions/togglemute.js" />
/// <reference path="plugin/js/actions/volumedown.js" />
/// <reference path="plugin/js/actions/volumeup.js" />
/// <reference path="plugin/js/actions/skipbackward.js" />
/// <reference path="plugin/js/actions/skipforward.js" />
/// <reference path="plugin/js/actions/currentvolume.js" />

const plugins = [
	new PlayPauseAction(PlayPauseAction.type),
	new PauseAction(PauseAction.type),
	new PlayAction(PlayAction.type),
	new StopAction(StopAction.type),
	new ToggleMuteAction(ToggleMuteAction.type),
	new VolumeDownAction(VolumeDownAction.type),
	new VolumeUpAction(VolumeUpAction.type),
	new SkipBackwardAction(SkipBackwardAction.type),
	new SkipForwardAction(SkipForwardAction.type),
	new CurrentVolumeAction(CurrentVolumeAction.type)
];



const $FB = new Object({
	isMuted: null,
	volume: null,
	state: null,
	connected: false,
})

$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	console.log('Stream Deck connected!');
	const funk = async () => {
		try {
			foobarPlayerState = await foobar.getPlayerState();
	
			const { activeItem: { playlistIndex, index } } = foobarPlayerState;
	
			if (playlistIndex > -1 && index > -1) {
				//foobarPlayerArtwork = await foobar.getCurrentArtwork(playlistIndex, index);
			}
			$FB.isMuted = foobarPlayerState.volume.isMuted;
			$FB.volume = foobarPlayerState.volume.value;
			$FB.state = foobarPlayerState.playbackState;
			$FB.connected = true;

			plugins.forEach((plugin) => {
				if (plugin.onWillAppear != null && plugin.context) {
					plugin.onWillAppear(null);
				}
			});
			
		} catch (e) {
			console.log(
			"Error to connect with foobar2000, check if foobar is running!"
			);
			console.log(e);
			$FB.connected = false;
		}
	}
	setInterval(funk, 1000);
});
