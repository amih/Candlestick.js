// each indicator needs to have a unique name in the indicators object
// the value is an array of the parameters used to define the indicaotr
$(function() {
  $('#ticker').focus();
  refreshChart('#ticker');
  $('#ticker').bind('keypress', function(e) {
    if(e.which==13){
      refreshChart('#ticker');
    }
  });
  $('#ticker').click(function(){
    $('#ticker').select();
  });
  $('#go_button').click(function(){
    refreshChart('#ticker');
  });
  $('.history').on('click', 'li', function(){
    $('#ticker').val($(this).text());
    refreshChart('#ticker');
  });
});
var refreshChart = function(selector){
  var ticker = $(selector).val().toUpperCase();
  var options = {
    title: ticker+' weekly'
    , indicators : [
        ['EMA', 'c', 26]
      , ['SMA', 'c', 200]
      , ['MACD', 12, 26, 9]
    ]
  };
  $.get("../../data/weekly."+ticker+".txt",function(data) {
    $('.history').html(addHistory(ticker));
    var chart = new Candlestick("myChart",data, options);
    console.log(chart);
    findExtremum(chart);
  }).fail(function() { alert('Ticker not found.'); });
  $(selector).select();
}
var addHistory = function(ticker){
 if (typeof addHistory.tickers == 'undefined' ) {
   addHistory.tickers = [ticker];
 } else if(addHistory.tickers.indexOf(ticker)==-1) {
   addHistory.tickers.push(ticker);
 }
 return '<ul><li>'+addHistory.tickers.join('</li><li>')+'</li></ul>';
}
var findExtremum = function(chart){
  var c   = chart.data[0].c;
  var d   = chart.data[0].d;
  var ema = chart.data[1][0].arr;//EMA(c,26)
  var arrCrossUp = [];
  for(var i=1; i<c.length-1; i++){
    if (c[i]<ema[i] && c[i-1]>ema[i-1]){
      console.log('close crosses above EMA(c,26) at {0}'.format(d[i]));
      arrCrossUp.push(i);
      chart.drawLine(i-1,c[i-1]*1.01,i+4,c[i-1]*1.2,'blueviolet');
    }
  }
}
