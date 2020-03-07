
toggleEditMode = function(model)
{
  model.editMode_ = !model.editMode_;
}

toggleRecordMode = function(model, step)
{
  model.recordMode_ = !model.recordMode_;
}

toggleStep = function(model, step)
{
  model.pattern_.steps_[model.channel_][step] = ! model.pattern_.steps_[model.channel_][step];
}

recordStep = function(model, offset)
{
  // take into account we've already steppde ahead
  offset = offset + model.patternLength() -1;
  const position = (model.step_ + offset ) % model.patternLength();
  model.pattern_.steps_[model.channel_][position] = true;
}

setChannel = function(model, channel)
{
  model.channel_ = channel;
}
