// each indicator needs to have a unique name in the indicators object
// the value is an array of the parameters used to define the indicaotr
$(function() {
  var indicators = {
    sma7 : ['SMA', 'c',  7]
  , sma40: ['SMA', 'c', 40]
  , sma45: ['SMA', 'c', 45]
  };
  $.get("AAPL.weekly.txt",function(data) {
    Candlestick("myChart",data, indicators);
  });
});
