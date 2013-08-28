// each indicator needs to have a unique name in the indicators object
// the value is an array of the parameters used to define the indicaotr
$(function() {
  var options = {
    title: 'AAPL weekly'
    , indicators : [
        ['EMA', 'c', 26]
      , ['EMA', 'c', 12]
      , ['MACD', 12, 26, 9]
    ]
  };
  $.get("AAPL.weekly.txt",function(data) {
    Candlestick("myChart",data, options);
  });
});
