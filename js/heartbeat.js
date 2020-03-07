var NanoTimer = require("nanotimer");
var now = require("performance-now");
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var STickHeartBeat = function(heartbeat)
{
  heartbeat.tick();
}

Heartbeat = function(ticksPerBeat)
{
    this.tempo_ = 80;
    this.timer_ = new NanoTimer();
    this.clockTicksPerBeat_ = ticksPerBeat;
    this.tickCount_ = 0;
    this.previousTime_ = now();
}

util.inherits(Heartbeat, EventEmitter);

Heartbeat.prototype.setTempo = function(tempo)
{
  this.tempo_ = tempo;
  this.updateTimer();
}

Heartbeat.prototype.run = function()
{
  this.tickCount_ = 0;
  this.updateTimer();
}

Heartbeat.prototype.offsetFromTick = function()
{
  const offsetFromLastTick = (now() - this.previousTime_);
  // returns 0 if we're closed to the previous step or 1 if it is closer to the coming next one
  return  offset = Math.floor(2 * offsetFromLastTick / this.intervalInMillisecs_);
}

Heartbeat.prototype.connect = function(target)
{
  if (target instanceof Function)
  {
    this.on("tick", target);
  }
  else
  {
    this.on("tick", function(tickCount)
      {
        target.tick(tickCount);
      });
  }
}

Heartbeat.prototype.ticksPerBeat = function()
{
  return this.clockTicksPerBeat_;
}

Heartbeat.prototype.updateTimer = function()
{
  this.intervalInMillisecs_ =  60000./this.tempo_/this.clockTicksPerBeat_ ;
  interval = '' + this.intervalInMillisecs_ + 'm';
  this.timer_.clearInterval();
  this.timer_.setInterval(function(hb)
    {
       hb.previousTime_ = now();
       hb.emit("tick", hb.tickCount_++);
     }, [this], interval);
}
