const MuteState = Object.freeze({
  unmuted: 0,
  muted: 1,
});

class ToggleMuteAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.togglemute";

  setMuteStatus = (muted) => {
    this.foobarMuteState = muted;
  };

  onKeyDown = (coordinates, state) => {
    foobar.setMuteStatus(state !== MuteState.muted, (success, message) => {
      $SD.setState(this.context, state);
      if (!success) {
        $SD.showAlert(this.context);
        $SD.logMessage("Error to toggle mute, check if foobar is running!");
      }
    });
  };

  onKeyUp = (coordinates, state) => {
    $SD.setState(this.context, state);
  };

  onWillAppear = (coordinates) => {
    if (this.foobarMuteState !== undefined) {
      $SD.setState(
        this.context,
        this.foobarMuteState ? MuteState.muted : MuteState.unmuted
      );
    } else {
      $SD.showAlert(this.context);
    }
  };
}
