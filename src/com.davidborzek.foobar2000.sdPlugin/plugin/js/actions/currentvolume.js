class CurrentVolumeAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.currentvolume";

  setCurrentVolume = (volume) => {
    this.foobarCurrentVolume = volume;
  };

  onWillAppear = (coordinates) => {
    if (this.foobarCurrentVolume > -100) {
      $SD.setTitle(
        this.context,
        `${Math.ceil(100 + this.foobarCurrentVolume)}`
      );
    } else {
      $SD.showAlert(this.context);
    }
  };
}
