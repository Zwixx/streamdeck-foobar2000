class CurrentVolumeAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.currentvolume";

  onWillAppear = (coordinates) => {
    if ($FB.volume != null) {
      $SD.setTitle(
        this.context,
        `${Math.ceil(100 + $FB.volume)}`
      );
    } else {
      $SD.showAlert(this.context);
    }
  };
}
