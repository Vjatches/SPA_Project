$.getJSON("../json/kantor-exchange.json",function(json) {
		$("#kantor-exchange").text(json[0].Kupno);
 });
