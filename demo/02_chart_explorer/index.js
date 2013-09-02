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
    , adjust: 1
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
  }).fail(function() { 
    $.get("../../data/daily."+ticker+".txt",function(data) {
      $('.history').html(addHistory(ticker));
      options.title = ticker+' daily';
      var chart = new Candlestick("myChart",data, options);
      console.log(chart);
    }).fail(function() { alert('Ticker not found.'); });
  });
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
