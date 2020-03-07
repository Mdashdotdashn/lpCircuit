require("./circuit.js");
require("./model.js");
require("./basicview.js");
require("./heartbeat.js");

Application = function(pad)
{
  this.pad_ = pad;
  this.circuit_ = new Circuit();
  this.heartbeat_ = new Heartbeat(4);
  this.model_ = new Model();
  this.view_ = new BasicView(pad, this.model_);
  this.view_.on('message', m =>
  {
    switch(m.name)
    {
      case "trigger":
        const i = m.value;
        this.circuit_.triggerDrum(i%4, 48 +i);
        break;
    }
  });
  this.step_ = 0;

  this.pad_.on('key', k => {
    this.handleKey(k);
  });

  this.heartbeat_.connect(this)
}

Application.prototype.handleKey = function(key)
{
  // Adds a field specifying at which step the keypress happens
    key.offset = this.heartbeat_.offsetFromTick();
    // dispatch
    this.view_.handleKey(key);
    // redraw
    this.redraw();
}

Application.prototype.tick = function()
{
  this.model_.tick();
  const triggers = this.model_.triggers();
  triggers.forEach((t,i) => {
    if (t)
    {
      this.circuit_.triggerDrum(i%4, 48 +i);
    }
  });
  this.redraw();
}

Application.prototype.redraw = function()
{
  this.view_.draw();
}

Application.prototype.run = function()
{
  this.heartbeat_.run();
}
