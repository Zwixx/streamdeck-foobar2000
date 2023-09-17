class SkipForwardAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.skipforward";

  onKeyDown = (coordinates, state) => {
    foobar.skipForward((success, message) => {
      if (!success) {
        $SD.showAlert(this.context);
        $SD.logMessage(
          "Error to skip forward, check if foobar is running!"
        );
      }
    });
  };
}
