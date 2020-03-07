var patternLength = 16;
var channelCount = 16;

Pattern = function()
{
  this.steps_ = new Array(channelCount);
  for (var i = 0; i < this.steps_.length; i++)
  {
    this.steps_[i] = new Array(patternLength).fill(false);
  }
}

Pattern.prototype.length = function()
{
  return patternLength;
}

Pattern.prototype.triggersAt = function(step)
{
  return this.steps_.map(s => s[step]);
}

Pattern.prototype.steps = function(channel)
{
  return this.steps_[channel];
}
