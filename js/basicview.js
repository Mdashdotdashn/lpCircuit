require("./lp-screen-buffer.js")
require("./logic.js")
const util = require('util');

const EventEmitter = require('events').EventEmitter;

BasicView = function(pad, model)
{
  this.pad_ = pad;
  this.model_ = model;
  this.launchpadBuffer_ = new LaunchpadScreenBuffer();
}

util.inherits(BasicView, EventEmitter);

BasicView.prototype.handleKey = function(key)
{
  if (key.pressed)
  {
    if (key.x == 0 && key.y == 8)
    {
      toggleEditMode(this.model_);
    }
    else if (key.x == 1 && key.y == 8)
    {
      toggleRecordMode(this.model_);
    }
    else if (key.x < 4 && key. y < 4)
    {
      var index = key.x + 4 * key.y;
      if( this.model_.editMode_)
      {
        toggleStep(this.model_, index);
      }
      else
      {
        setChannel(this.model_, index);
        var emit = true;
        if (this.model_.recordMode_)
        {
          // record step
          recordStep(this.model_, key.offset);
          // if we're going to hear it after, don't emit it
          emit = (key.offset == 0) ? true : false;
        }
        if (emit)
        {
          this.emit('message', { name: "trigger", value: index});
        }
      }
    }
  }
}

BasicView.prototype.draw = function(model)
{
  buffer = new ScreenBuffer();

  const positionFn = (x) => [x%4, Math.floor(x/4)];

  // draw triggers or steps
  const steps = this.model_.editMode_ ? this.model_.steps() : this.model_.triggers();
  steps.forEach((t,i) => {
    buffer.col(t ? 'r' : '', positionFn(i));
  })
  // draw current position
  buffer.col('G', positionFn(this.model_.step()));
  // edit vs Perform
  buffer.col(this.model_.editMode_ ? 'A' : 'g', [0,8]);
  // record
  buffer.col(this.model_.recordMode_ ? 'R' : 'a', [1,8]);
  // send buffer
  this.launchpadBuffer_.update(buffer, this.pad_);
}
