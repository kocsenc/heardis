var config = require('./config.json');
var plotly = require('plotly')(config.user, config.apiKey);

var initData = [{x: [], y: [], stream: {token: config.streamKey, maxpoints: 1000}}];
var initGraphOptions = {fileopt: "extend", filename: config.graphName};

plotly.plot(initData, initGraphOptions, function (err, msg) {
  if (err) return console.log(err);
  console.log(msg);

  // Create the stream
  var stream1 = plotly.stream(config.streamKey, function (err, res) {
    console.log('STREAM ENDING');
    console.log(err, res);
    clearInterval(loop); // once stream is closed, stop writing
  });

  // Set the loop
  var loop = setInterval(function () {
    var streamObject = JSON.stringify(
      {
        x: (new Date).getTime(),
        y: getRandomArbitrary(0, 500)
      }
    );
    stream1.write(streamObject + '\n');

  }, 1000);
});

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
