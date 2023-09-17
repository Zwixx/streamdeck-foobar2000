class ActionRouter {


  constructor(type) {
    let action = new Action(type);

    action.onKeyUp(({ action, context, device, event, payload }) => {
      if (this.onKeyUp != null) {
        this.setContext(context);
        this.setSettings(payload.settings);
        this.onKeyUp(payload.coordinates, payload.state);
      }
    });
    action.onKeyDown(({ action, context, device, event, payload }) => {
      if (this.onKeyDown != null) {
        this.setContext(context);
        this.setSettings(payload.settings);
        this.onKeyDown(payload.coordinates, payload.state);
      }
    });
    action.onWillAppear(({ action, context, device, event, payload }) => {
      if (this.onWillAppear != null) {
        this.setContext(context);
        this.setSettings(payload.settings);
        this.onWillAppear(payload.coordinates, payload.state);
      }
    });
  }

  getContext = () => {
    return this.context;
  };

  setContext = (context) => {
    this.context = context;
  };

  getSettings = () => {
    return this.settings;
  };

  setSettings = (settings) => {
    this.settings = settings;
  };
}
