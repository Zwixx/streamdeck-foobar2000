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
    action.onDialRotate(({state, payload}) => {
      if (this.onDialRotate != null) {
        this.onDialRotate(state, payload);
      }
    });
    action.onDialPress(({coordinates, state, payload}) => {
      if (this.onDialPress != null) {
        this.onDialPress(coordinates, state, payload);
      }
    });
    action.onTouchTap(({coordinates, state, payload}) => {
      if (this.onTouchTap != null) {
        this.onTouchTap(coordinates, state, payload);
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
