class StopAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.stop";

  onKeyDown = (coordinates, state) => {
    foobar.stop((success, message) => {
      $SD.setState(this.context, state);
      if (!success) {
        $SD.showAlert(this.context);
        $SD.logMessage(
          "Error to stop the playback, check if foobar is running!"
        );
      } else {
        $FB.state = "stopped";
      }
    });
  };
}
