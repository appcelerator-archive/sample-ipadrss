Ti.UI.backgroundColor = "#fff";

var masterWindow = Ti.UI.createWindow({
  backgroundColor: '#FFF',
  title: 'RSS Feeds'
});
var masterNavigationGroup = Ti.UI.iPhone.createNavigationGroup({
  window: masterWindow
});

var detailWindow = Ti.UI.createWindow({
  backgroundColor: '#FFF',
  title: 'Feed Details'
});
var detailNavigationGroup = Ti.UI.iPhone.createNavigationGroup({
  window: detailWindow
});

//Include logic for master and detail views
Ti.include("detail.js");
Ti.include("master.js");


/*** SPLIT WINDOW SETUP ***/
var splitWindow = Ti.UI.iPad.createSplitWindow({
  detailView: detailNavigationGroup,
  masterView: masterNavigationGroup
});

splitWindow.addEventListener('visible', function(e) {
  if (e.view == 'detail') {
    e.button.title = "RSS Feeds";
    detailWindow.leftNavButton = e.button;
  }
  else if (e.view == 'master') {
    detailWindow.leftNavButton = null;
  }
});

splitWindow.open();