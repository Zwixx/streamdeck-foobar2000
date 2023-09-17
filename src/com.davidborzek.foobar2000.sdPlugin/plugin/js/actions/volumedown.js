class VolumeDownAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.volumedown";

  setVolume = (volume) => {
    this.foobarCurrentVolume = volume;
  };

  onKeyDown = (coordinates, state) => {
    const volumeStep = this.settings.volumeStep || 1;

    foobar.setVolume(
      this.foobarCurrentVolume - volumeStep,
      (success, message) => {
        $SD.setState(this.context, state);
        if (!success) {
          $SD.showAlert(this.context);
          $SD.logMessage(
            "Error to decrease the volume, check if foobar is running!"
          );
        }
      }
    );
  };
}
