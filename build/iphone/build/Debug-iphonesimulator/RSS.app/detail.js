// create table view data object
var data = [];
var rssTable = Titanium.UI.createTableView({data:data});
detailWindow.add(rssTable);

//create a window to hold a news page
var newsPage = null;


//Load an RSS feed when we get the message to do so
Ti.App.addEventListener("loadFeed", function(e) {
  //set new title
  detailWindow.title = e.title;
  
  //Indicate we're loading a new feed
  data = [{title:"Loading News Feed..."}];
  rssTable.setData(data);

  var xhr = Ti.Network.createHTTPClient();
  xhr.onload = function() {
  	try {
  		var doc = this.responseXML.documentElement;
  		var items = doc.getElementsByTagName("item");
  		var x = 0;
  		var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
  		for (var c=0;c<items.length;c++) {
  			var item = items.item(c);
  			var thumbnails = item.getElementsByTagName("media:thumbnail");
  			if (thumbnails && thumbnails.length > 0) {
  				var media = thumbnails.item(0).getAttribute("url");
  				var title = item.getElementsByTagName("title").item(0).text;
  				var row = Ti.UI.createTableViewRow({height:80});
  				var label = Ti.UI.createLabel({
  					text:title,
  					left:72,
  					top:5,
  					bottom:5,
  					right:5				
  				});
  				row.add(label);
  				var img = Ti.UI.createImageView({
  					url:media,
  					left:5,
  					height:60,
  					width:60
  				});
  				row.add(img);
  				data[x++] = row;
  				row.url = item.getElementsByTagName("link").item(0).text;
  			}
  		}
  		rssTable.setData(data);
  		rssTable.addEventListener('click',function(e) {
  		  if (newsPage) {
  		    newsPage.close();
  		  }
      	newsPage = Ti.UI.createWindow({title:doctitle});
      	var wb = Ti.UI.createWebView({url:e.row.url});
      	newsPage.add(wb);
      	detailNavigationGroup.open(newsPage,{animated:true});
      });
  	}
  	catch(E) {
  		alert(E);
  	}
  };
  xhr.open("GET","http://v2.0.news.tmg.s3.amazonaws.com/feeds/news.xml");
  xhr.send();
});
