/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />
/// <reference path="plugin/js/actions/playpause.js" />
/// <reference path="plugin/js/actions/pause.js" />
/// <reference path="plugin/js/actions/play.js" />
/// <reference path="plugin/js/actions/stop.js" />

//const playpause = new Action(PlayPauseAction.type);
const playpause = new PlayPauseAction(PlayPauseAction.type);
const pause = new PauseAction(PauseAction.type);
const play = new PlayAction(PlayAction.type);
const stop = new StopAction(StopAction.type);

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
			playpause.setPlaybackState(foobarPlayerState.playbackState);
		} catch (e) {
			console.log(
			"Error to connect with foobar2000, check if foobar is running!"
			);
		}
	}
	funk();
});
