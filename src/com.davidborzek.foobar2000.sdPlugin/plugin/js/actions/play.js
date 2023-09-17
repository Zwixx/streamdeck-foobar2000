class PlayAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.play";

  onKeyDown = (coordinates, state) => {
    foobar.triggerPlay((success, msg) => {
      if (!success) {
        $SD.showAlert(this.context);
        $SD.log(
          "Error to play or pause, check if foobar is running!"
        );
      }
    });
  };
}
