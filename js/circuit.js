var easymidi = require("easymidi");

Circuit = function()
{
  var interfaceName = "circuit";
  var outputs = easymidi.getOutputs();
  outputs.forEach(o => {
    console.log(o.toLowerCase());
    if (o.toLowerCase().indexOf(interfaceName) != -1)
    {
      console.log("Using midi output "+o);
      this.output_ = new easymidi.Output(o);
    }
  }, this)
}

// Triggers a drum sound on one of the 4 drum channel
Circuit.prototype.triggerDrum = function(drumChannel, drumIndex)
{
  if (!this.output_) return;

  // First send the CC to select the index

  const cc = [8, 18, 44, 50];
  this.output_.send("cc", {
    controller: cc[drumChannel],
    value: drumIndex,
    channel: 9
  });

  // Then send a quick note on / note off to trigger
  var notes = [60, 62, 64, 65];
  var noteEvent =  {
    	      note: notes[drumChannel],
    	      velocity: 100,
    	      channel: 9
          };

  this.output_.send('noteon', noteEvent, this);
  this.output_.send('noteoff', noteEvent, this);
}
