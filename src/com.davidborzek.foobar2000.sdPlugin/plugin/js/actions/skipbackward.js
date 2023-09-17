class SkipBackwardAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.skipbackward";

  onKeyDown = (coordinates, state) => {
    foobar.skipBackward((success, message) => {
      if (!success) {
        $SD.showAlert(this.context);
        $SD.logMessage(
          "Error to skip backward, check if foobar is running!"
        );
      }
    });
  };
}
