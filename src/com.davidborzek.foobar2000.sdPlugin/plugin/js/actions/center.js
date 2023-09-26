class CenterAction extends ActionRouter {

    static type = "com.davidborzek.foobar2000.center";
    foobarLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAewgAAHsIBbtB1PgAAAd1QTFRFAAAA2NjY1tbW19fX2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY19fX2NjY0dHR1NTU09PT0tLS2NjY19fX2NjYt7e3PDw8Ojo6mZmZ1tbW1dXVk5OTODg4QUFBu7u72NjYo6OjBgYGAQEBCgoKeHh4bm5uCAgICwsLqKio2NjY2NjYtbW1FhYWCQkJkZGRiIiIBwcHGxsburq62NjY2NjY1dXVT09PJSUlxMTEv7+/Hx8fWVlZ19fX2NjY2NjY2NjYs7OzLCwsAwMDl5eXiYmJNTU1ubm52NjY19fX1tbW2NjY1tbWuLi4Nzc3BQUFhYWFdnZ2AgICPT09vr6+19fX2NjY2NjY2NjYzMzMnJycfX19x8fHn5+fzs7O2NjY2NjYysrK2NjYwsLCyMjI19fX2NjY2NjYxsbGUlJShoaGfn5+WFhYycnJ2NjY2NjY2NjYn5+f19fXjIyMpaWl2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjYnQEEDQAAAJ90Uk5TABQAAqRDUpow/d4kK+X6Jhy2/7AKDbmqFlv18mU3b/TwUQy/+Pb5tQgu7ecneWwHuv////+vAzPZ///////////SV+v/////////5Utj8f///////+pVTub////////fQBvK/////////8EQAXv9///////////8biDd////////1xn/X///BRDG////////vCHF/f///Bos2NEoz7QSXIBOygAAAUlJREFUeJyl0FVTQkEYBuDFVsxPVAxECcXCLiSstRsbW7E7McDCLsDO3+o5csHuAS8c34t9d/aZ2ULo/+F5Odub5wF9fJ3t5+9uAYFBfLaDQ0LDuBYeARApQCgqGiBGyMHYOID4BJEoUQyQlEybRApMZHJ5CtupCgrT0oFIRiaFWUBFSVp2Tm6ei/ILCosILC4pVZWpnaTR6soryH0rq6pxTe2PaurqcUNjE4HNLa0Yt7Wz2KHHuLOrm8Ce3j6Mcb8BYGCQmQwNjxA4OjY+gbFxEmCKsemZ2TkC5xcWl5ZXjKsAa+v6jc0tE/XO7R3Y3TNbAAzm/QM4PKL/Tyljb2M5ZkexlTakMDGrJzrVKVPWMw6i8wu4vLq+ub0Dm4RrCNkd99oH9eOT7dndEHp5ZQ9843syhN4/ABx2z4aQQPrpdhdXhF+/25/yDTvLRGggNwQCAAAAAElFTkSuQmCC"
  
    onDialRotate = (state, payload) => {
      const dialTurnAction = this.settings.dialTurnAction || "volume"
      if (dialTurnAction === "volume") {
        const volumeStep = this.settings.volumeStep || 1;
        foobar.setVolume(
          this.foobarCurrentVolume + volumeStep * payload.ticks,
          (success, message) => {
            $SD.setState(this.context, state);
            if (!success) {
              $SD.showAlert(this.context);
              $SD.log(
                "Error to change the volume, check if foobar is running!"
              );
            }
          }
        );
      } else {
        if (payload.ticks > 0)
          foobar.skipForward((success, message) => {
            if (!success) {
              $SD.showAlert(this.context);
              $SD.logMessage(
                "Error to skip forward, check if foobar is running!"
              );
            }
          });
        else
          foobar.skipBackward((success, message) => {
            if (!success) {
              $SD.showAlert(this.context);
              $SD.logMessage(
                "Error to skip backward, check if foobar is running!"
              );
            }
          });
      }
    };
  
    onDialPress = (coordinates, state, payload) => {
      if (payload.pressed) { //Only execute on press but not on release
        this.playPause(coordinates, state, payload)
      }
    };
  
    onTouchTap = (coordinates, state) => {
      this.playPause(coordinates, state);
    };
  
    playPause = (coordinates, state) => {
      if (this.foobarPlaybackState === "stopped") {
        foobar.playRandom((success, msg) => {
          $SD.setState(this.context, state);
          if (!success) {
            $SD.showAlert(this.context);
            $SD.logMessage(
              "Error to play a random song, check if foobar is running!"
            );
          }
        });
      } else {
        foobar.togglePlayPause((success, msg) => {
          $SD.setState(this.context, state);
          if (!success) {
            $SD.showAlert(this.context);
            $SD.logMessage(
              "Error to play or pause, check if foobar is running!"
            );
          }
        });
      }
    };
  
    onWillAppear = (coordinates) => {
      this.updateInformation()
    };
  
    updateInformation() {
      this.settings.titleInformation = this.settings.titleInformation || "track";
      this.settings.valueInformation = this.settings.valueInformation || "artist";
      this.settings.iconInformation = this.settings.iconInformation || "track";
  
      const title = this.settings.titleInformation === "track"
        ? $FB.title.columns[1]
        : this.settings.titleInformation === "artist" ? $FB.title.columns[0] : "Control Centre"
      const value = this.settings.valueInformation === "track"
        ? $FB.title.columns[1]
        : this.settings.valueInformation === "artist" ? $FB.title.columns[0] : ""
      const art = this.settings.iconInformation === "trackArt" ? $FB.artwork : this.foobarLogo
  
      if (this.foobarCurrentPlayback.playbackState === "stopped") {
        $SD.setTitle(this.context, "Stopped");
      } else {
        intervals[this.context] && clearInterval(intervals[this.context]);
        websocketUtils.setAsyncTitleMultiline(
          title,
          value,
          300,
          this.context
        );
  
        $SD.setImage(
          this.context,
          art
        )
  
        let sliderPercent = Math.pow(10, this.foobarCurrentVolume / 20) * 100
        websocketUtils.setFeedback(
          this.context,
          art,
          title,
          value,
          sliderPercent,
        )
      }
    };
  }