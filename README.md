# heardis

At it's core this is the code that runs on a Tessel2 which grabs sound 
data off the ambient sensor and streams it to [plot.ly](https://plot.ly).
Plot.ly stores the information and can be shared accross devices.

The goal of this project is to be able to see, in real time, the volume
around the device from anywhere.

The cool thing about Tessels is that they are internet ready; imagine an 
Arduino that just has Wi-Fi; and it works.


## What you'll need

You will need:

1. A Tessel or [Tessel2](https://tessel.io) (preferred)
1. The [Tessel Ambient Module](https://tessel.io/modules#module-ambient)
1. A Free account on [plot.ly](https://plot.ly). See `config.json.sample` to see what you need from [plot.ly](https://plot.ly).

## Get Started

1. Create a `config.json` based off of `config.json.sample` and fill out the missing parts.
1. `npm install`
1. Connect to your tessel ([see quickstart](http://tessel.github.io/t2-start/))
1. `t2 run index.js` to run on tessel 


### Missing config.js?

There is a sample `config.json.example` file to show you what config information looks like.
But basically you will need an `API key` for plot.ly along with a `STREAM key` for streaming
data. They are both easy to find in plot.ly's [settings page](https://plot.ly/settings/api).

Remember plot.ly information is public by default. 
