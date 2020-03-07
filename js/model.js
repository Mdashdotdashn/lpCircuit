require("./pattern.js");

Model = function()
{
  this.step_ = 0;
  this.channel_ = 0;
  this.editMode_ = false; // Perform vs edit
  this.recordMode_ = false;
  this.pattern_ = new Pattern();
  this.triggers_ = new Array(this.pattern_.length()).fill(false);
}

Model.prototype.tick = function()
{
  this.triggers_ = this.pattern_.triggersAt(this.step_);
  this.step_ = (this.step_ + 1) % this.pattern_.length();
}

Model.prototype.triggers = function()
{
  return this.triggers_;
}

// returns all steps for the current channels
Model.prototype.steps = function()
{
  return this.pattern_.steps(this.channel_);
}

// returs the current sequencing position
Model.prototype.step = function()
{
  return this.step_;
}

Model.prototype.patternLength = function()
{
  return this.pattern_.length();
}
