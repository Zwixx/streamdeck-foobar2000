const MuteState = Object.freeze({
  unmuted: 0,
  muted: 1,
});

class ToggleMuteAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.togglemute";

  onKeyDown = (coordinates, state) => {
    $FB.isMuted = !$FB.isMuted;
    foobar.setMuteStatus($FB.isMuted, (success, message) => {
      $SD.setState(this.context, state);
      if (!success) {
        $SD.showAlert(this.context);
        $SD.logMessage("Error to toggle mute, check if foobar is running!");
      }
    });
  };

  onKeyUp = (coordinates, state) => {
    $SD.setState(this.context, $FB.isMuted ? MuteState.muted : MuteState.unmuted);
  };

  onWillAppear = (coordinates) => {
    if ($FB.isMuted !== null) {
      $SD.setState(
        this.context,
        this.foobarMuteState ? MuteState.muted : MuteState.unmuted
      );
    } else {
      $SD.showAlert(this.context);
    }
  };
}
