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
  var l = chart.data[0].l;
  var h = chart.data[0].h;
  var macd = chart.data[1][2].data.macd;
  var searchLengthLeft = 5;
  var arrMin = []
    , arrMax = [];
  for(var i=1; i<l.length-1; i++){
    if (l[i]<chart.Min(l.slice(i+1,Math.min(l.length-1,i+1+searchLengthLeft))) && l[i]<chart.Min(l.slice(Math.max(0,i-searchLengthLeft), i))){
      console.log('found minimum at {0}'.format(i));
      arrMin.push(i);
    }
  }
  for(var i=1; i<l.length-1; i++){
    if (h[i]>chart.Max(h.slice(i+1, Math.min(h.length-1,i+searchLengthLeft+1))) && h[i]>chart.Max(h.slice(Math.max(0,i-searchLengthLeft), i))){
      console.log('found max at {0}'.format(i));
      arrMax.push(i);
    }
  }
  for(var i=1; i<arrMin.length; i++){
    if(l[arrMin[i-1]]<l[arrMin[i]] && macd[arrMin[i-1]]>macd[arrMin[i]]){
      console.log('found double bottom divergence at {0}'.format(arrMin[i-1]));
    }
  }
  for(var i=1; i<arrMax.length; i++){
    if(h[arrMax[i-1]]>h[arrMax[i]] && macd[arrMax[i-1]]<macd[arrMax[i]]){
      console.log('found double top divergence at {0}'.format(arrMax[i-1]));
    }
  }
}
