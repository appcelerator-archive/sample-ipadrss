var data = [
  {title: "Top Stories", hasChild: true, url: "http://v2.0.news.tmg.s3.amazonaws.com/feeds/news.xml"},
  {title: "Arts and Leisure", hasChild: true, url: "http://v2.0.news.tmg.s3.amazonaws.com/feeds/news.xml"},
  {title: "Sports", hasChild: true, url: "http://v2.0.news.tmg.s3.amazonaws.com/feeds/news.xml"},
  {title: "Technology", hasChild: true, url: "http://v2.0.news.tmg.s3.amazonaws.com/feeds/news.xml"}
];

var feedsTable = Ti.UI.createTableView({
  data:data
});
masterWindow.add(feedsTable);

feedsTable.addEventListener('click', function(e) {
	Ti.App.fireEvent("loadFeed", {url:e.rowData.url,title:e.rowData.title});
});

//Load the first feed to initialize
Ti.App.fireEvent("loadFeed", {url:"http://v2.0.news.tmg.s3.amazonaws.com/feeds/news.xml", title:"Top Stories"});