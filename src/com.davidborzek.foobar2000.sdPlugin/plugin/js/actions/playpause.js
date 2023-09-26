const PlaybackState = Object.freeze({
  paused: 1,
  playing: 0,
});

class PlayPauseAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.playpause";

  onKeyDown = (coordinates, state) => {
    if ($FB.state == null) {
      return;
    }
    if ($FB.state === "stopped") {
      foobar.playRandom((success, msg) => {
        if (!success) {
          $SD.showAlert(this.context);
          $SD.logMessage(
            "Error to play a random song, check if foobar is running!"
          );
        }
      });
    } else {
      foobar.togglePlayPause((success, msg) => {
        if (!success) {
          $SD.showAlert(this.context);
          $SD.logMessage(
            "Error to play or pause, check if foobar is running!"
          );
        }
      });
    }
  };

  onKeyUp = async (coordinates, state) => {
    this.refreshState();
  };

  onWillAppear = (coordinates) => {
    this.refreshState();
  };

  refreshState = async () => {
    if ($FB.state != null) {
      $SD.setState(
        this.context,
        PlaybackState[$FB.state]
      );
    } else {
      $SD.showAlert(this.context);
    }
  }
}
