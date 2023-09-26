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

const playpause = new PlayPauseAction(PlayPauseAction.type);
const pause = new PauseAction(PauseAction.type);
const play = new PlayAction(PlayAction.type);
const stop = new StopAction(StopAction.type);
const togglemute = new ToggleMuteAction(ToggleMuteAction.type);
const volumedown = new VolumeDownAction(VolumeDownAction.type);
const volumeup = new VolumeUpAction(VolumeUpAction.type);
const skipbackward = new SkipBackwardAction(SkipBackwardAction.type);
const skipforward = new SkipForwardAction(SkipForwardAction.type);

const $FB = new Object({
	isMuted: null,
	volume: null,
	state: null,
})
/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	const funk = async () => {
		console.log('Stream Deck connected!');

		try {
			foobarPlayerState = await foobar.getPlayerState();
	
			const { activeItem: { playlistIndex, index } } = foobarPlayerState;
	
			if (playlistIndex > -1 && index > -1) {
				foobarPlayerArtwork = await foobar.getCurrentArtwork(playlistIndex, index);
			}
			$FB.isMuted = foobarPlayerState.volume.isMuted;
			$FB.volume = foobarPlayerState.volume.value;
			$FB.state = foobarPlayerState.playbackState;
		} catch (e) {
			console.log(
			"Error to connect with foobar2000, check if foobar is running!"
			);
		}
	}
	funk();
});
