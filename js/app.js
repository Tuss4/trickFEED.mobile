function getThisId(datum){
	var newUrl = "http://youtube.com/embed/"+datum+"?autoplay=1&allowFullScreen=true";
	return newUrl;
}
function changeThisId(datum){
	document.getElementById("ytplayer").setAttribute("src",getThisId(datum));
}
$(document).ready(function(){
	var videoFeed = "http://gdata.youtube.com/feeds/api/videos?q=tricking&alt=json&format=5&max-results=20&orderby=published&callback=?&v=2&category=tricking";
	var output = "<ul>";
	$.getJSON(videoFeed, function(data){
		for(var i in data.feed.entry){
			var entries = data.feed.entry[i];
			var vidId = entries.id.$t.substring(27,38);
			output += "<a href='#"+vidId+"' onclick=changeThisId('"+vidId+"')><li id='"+vidId+"'><img src='"+entries.media$group.media$thumbnail[0].url+"' alt='"+entries.title.$t+"' title='"+entries.title.$t+"' /></li></a>";
		}
		output += "</ul>";
		document.getElementById("content").innerHTML = output;
		$("#content li").click(function(){
			$("#overlay").show();
		})
		$("#overlay").click(function(){
			$("#overlay").hide();
			$("#ytplayer").attr("src","http://youtube.com/embed/");
		})
	})
	$("#vidRefresh").click(function(){
		location.reload();
	});
})