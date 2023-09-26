class VolumeDownAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.volumedown";

  onKeyDown = (coordinates, state) => {
    
    const volumeStep = this.settings.volumeStep || 1;
    $FB.volume -= volumeStep;

    foobar.setVolume(
      $FB.volume,
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
