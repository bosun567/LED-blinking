// Import the onoff library
var onoff = require('onoff');
var Gpio = onoff.Gpio;
// Initialize GPIO 4 to be an output pin.
var led = new Gpio(4, 'out');
var interval;

   // The setInterval() method repeats a given function 
   // at every given time-interval.
interval=setInterval(function () {
   // - readSync() read GPIO value synchronously. Returns the 
   //   number 0 or 1 to represent the state of the GPIO.
   // - The state is reversed by (state + 1) % 2
   //       0 ==> 1
   //       1 ==> 0
   var value = (led.readSync() + 1) % 2;
   // write() asynchronously writes 0 or 1 to GPIO pin 4
   led.write(value, function() {
     console.log("Changed LED state to: " + value);
   });
}, 2000); // This interval will be called every two seconds

// Listen to the SIGINT event trioggered by Ctrl-C
process.on('SIGINT', function () {
   clearInterval(interval);
   // writeSync(value) write 0 or 1 to GPIO
   led.writeSync(0);
   // Cleanly close the GPIO pin befire existing.
   led.unexport();
   console.log('Bye, bye!');
   process.exit();
});
