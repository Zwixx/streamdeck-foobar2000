class PauseAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.pause";

  onKeyDown = (coordinates, state) => {
    foobar.triggerPause((success, msg) => {
      if (!success) {
        $SD.showAlert(this.context);
        $SD.log(
          "Error to play or pause, check if foobar is running!"
        );
      }
    });
  };
}
