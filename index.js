require("./js/application.js");

const Launchpad = require( 'launchpad-mini' );
pad = new Launchpad();

pad.connect().then( () => {     // Auto-detect Launchpad

  pad.reset();
  var app = new Application(pad);
  app.run();
}).catch(e => {
    console.log(e);
})
