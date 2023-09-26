/// <reference path="../../libs/js/property-inspector.js" />

$SD.onConnected({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
/*
  if (action == actions.volumeUp || action == actions.volumeDown) {
    const volumeStepDiv = document.getElementById("volume-step");
    volumeStepDiv.style.display = "flex";

    const volumeStepInput = volumeStepDiv.children[1];
    volumeStepInput.value = settings.volumeStep || 1;
    volumeStepInput.onchange = (evt) => {
      if (
        evt.target.value === "" ||
        Number.parseInt(evt.target.value, 10) < 0
      ) {
        volumeStepInput.value = 1;
      } else if (Number.parseInt(evt.target.value, 10) > 100) {
        volumeStepInput.value = 100;
      }
      $SD.setSettings(action, inUUID, {
        volumeStep: Number.parseInt(volumeStepInput.value, 10),
      });
    };
  }


};
*/