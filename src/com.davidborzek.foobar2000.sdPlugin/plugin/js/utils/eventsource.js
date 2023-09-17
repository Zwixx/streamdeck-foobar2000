const updatePlayPauseActions = (player) => {
  contexts.playPauseAction.forEach((context) => {
    player.playbackState &&
    $SD.setState(context, PlaybackState[player.playbackState]);
  });
};

const updateToggleMuteActions = (player) => {
  contexts.toggleMuteAction.forEach((context) => {
    player.volume &&
    $SD.setState(
        context,
        player.volume.isMuted ? MuteState.muted : MuteState.unmuted
      );
  });
};

const updateCurrentVolumeActions = (player) => {
  contexts.currentVolumeAction.forEach((context) => {
    player.volume &&
    $SD.setTitle(
        context,
        `${Math.ceil(100 + player.volume.value)}`
      );
  });
};

let currentPlayingArtist = "";
let currentPlayingTitle = "";

const updateCurrentPlaying = (player) => {
  if (player.activeItem.playlistIndex === -1 || player.activeItem.index === -1) {
    return;
  }

  contexts.nowPlayingAction.forEach((context) => {
    if (player.playbackState === "stopped") {
      intervals[context] && clearInterval(intervals[context]);
      $SD.setTitle(context, "Stopped");
      return;
    }
    if (
      player.activeItem.columns[0] !== currentPlayingArtist ||
      player.activeItem.columns[1] !== currentPlayingTitle
    ) {
      intervals[context] && clearInterval(intervals[context]);
      player.activeItem.columns.length > 0 &&
      websocketUtils.setAsyncTitleMultiline(
          player.activeItem.columns[1],
          player.activeItem.columns[0],
          300,
          context
        );

      foobar
        .getCurrentArtwork(
          player.activeItem.playlistIndex,
          player.activeItem.index
        )
        .then((res) => {
          foobarPlayerArtwork = res;
          $SD.setImage(context, res);
        });
    }
  });
  currentPlayingArtist = player.activeItem.columns[0];
  currentPlayingTitle = player.activeItem.columns[1];
};

const parameters = {
  player: "true",
  trcolumns: "%artist%,%title%,%artist%-%album%-%title%",
  playlists: "true",
  playlistItems: "true",
  plref: "p1",
  plcolumns: "%artist%,%title%",
  plrange: "0:100",
};

const eventSource = new EventSource(
  `${foobar.baseUrl}/query/updates?${new URLSearchParams(
    parameters
  ).toString()}`
);

eventSource.onmessage = function ({ data }) {
  const { player } = JSON.parse(data);
  if (player) {
    foobarPlayerState = player;
    if(typeof contexts === typeof undefined){
      return;
    }
    updatePlayPauseActions(player);
    updateToggleMuteActions(player);
    updateCurrentVolumeActions(player);
    updateCurrentPlaying(player);
  }
};

eventSource.onerror = (error) => {
  $SD.logMessage(
    "Error to connect with foobar2000, check if foobar is running!"
  );
};
