var config = require('./config.json');
var plotly = require('plotly')(config.user, config.apiKey);
var ambientlib = require('ambient-attx4');
var tessel = require('tessel'); // does not need to be in node_modules

var ambient = ambientlib.use(tessel.port[config.ambientModulePort]);
ambient.on('ready', function () {
  init()
});

ambient.on('error', function (err) {
  console.log(err);
});

/**
 * Main function. Will initialize the structure of the data sent
 * over to plot.ly.
 * Will then initialize the stream with plot.ly and send
 * data on every interval.
 *
 * Sensor data uses the Tessel Ambient module.
 */
function init() {
  var interval = 1000; // in ms
  var initData = [{
    x: [],
    y: [],
    stream: {token: config.streamKey, maxpoints: 1000}
  }];
  var initGraphOptions = {
    fileopt: 'extend',
    filename: config.graphName + (new Date).getTime()
  };

  plotly.plot(initData, initGraphOptions, function (err, msg) {
    if (err) return console.log(err);
    console.log(msg);

    // Create the stream
    var stream1 = plotly.stream(config.streamKey, function (err, res) {
      console.log('STREAM ENDING');
      clearInterval(loop);
      // if stream is closed, stop writing
      console.log(err, res);
    });

    var time = 0;
    var loop = setInterval(function () {
      ambient.getSoundLevel(function (err, sound) { // sound is between 0.0 and 1.0
        if (err) return console.log(err);

        var loudness = (sound * 100.0).toFixed(4);
        console.log('Sound Level:', loudness, '%');
        var streamObject = JSON.stringify(
          {
            x: time,
            y: loudness
          }
        );
        stream1.write(streamObject + '\n');

        time++;
      });
    }, interval);
  });
}
