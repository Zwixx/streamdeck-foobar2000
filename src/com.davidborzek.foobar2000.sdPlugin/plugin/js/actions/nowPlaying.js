class NowPlayingAction extends ActionRouter {
  static type = "com.davidborzek.foobar2000.nowplaying";

  onWillAppear = (coordinates) => {
    if ($FB.title == null) {
      $SD.setTitle(this.context, "Stopped");
    } else {
      $SD.setTitle(
        this.context,
        $FB.title.columns[0] + ' ' + $FB.title.columns[1]
      );

      $SD.setImage(
        this.context,
        this.currentArtwork
      )
    }
    
  };
}
