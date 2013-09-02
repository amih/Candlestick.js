Candlestick.js
==============

candlestick chart on canvas
---------------------------

This is a simple function to draw a candlestick chart using canvas.
The only file you need from this project is Candlestick.js

Not compatible with old browsers!
Tested on Chrome only!

![alt tag](https://raw.github.com/amih/Candlestick.js/master/data/Candlestick_js_screenshot.png)

Live demo:
* http://chartly.com/Candlestick.js/demo/01_minimal
* http://chartly.com/Candlestick.js/demo/02_chart_explorer
* http://chartly.com/Candlestick.js/demo/04_crossover

Assumptions
===========
Data is in the same format as in finance.yahoo.com historical prices, see for example: http://finance.yahoo.com/q/hp?s=AAPL+Historical+Prices
On this page in finance.yahoo.com you can inspect the link below the table titled: "Download to Spreadsheet"

Roadmap:
 - [ ] x coordinate labels for different ranges - daily charts
 - [ ] add more indicators to top of the screen - bollinger bands, keltner bands, EMA, ...
 - [ ] add bottom indicators - MACD, Volume, ...
 - [ ] cache data using indexedDB
 - [x] add labels for each top indicator, SMA(C,20) + line color
 - [ ] interactivity - allow scrolling by dragging sideways
 - [ ] allow drawing of trendlines by clicking and dragging
 - [ ] add mini language to define indicators and how to draw them

 Demo explanation
 ================

The minimal index.html file is really short, it contains in the HEAD section 3 javascript files,

1. jQuery from a CDN
2. the Candlestick.js file which is the main file for this project
3. the demo index.js file

In the BODY section there is one canvas element with an id and dimensions.

The index.js file has one jQuery function which onLoad sets the indicators object and uses AJAX to get the data from a file on the same server as the rest of the project.
when the get returns with data it calls the main function:

```
Candlestick(canvasID, data, options);
```
the parameters:
- canvasID: the canvas ID in the html DOM
- data    : the data in the finance.yahoo.com format, e.g. http://ichart.finance.yahoo.com/table.csv?s=AAPL&a=04&b=7&c=2013&d=07&e=27&f=2013&g=w&ignore=.csv
- options : an object with a title element and an indicators sub-object.

Data for the testing is for AAPL, MA and PRAA symbols.
A live demo is at smallestbusiness.com/Candlestick.js.demo_page/

Questions? Comments? @amiheines
