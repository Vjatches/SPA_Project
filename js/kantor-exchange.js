$.ajaxSetup({
   async: false
});

function swapCurrency(){
	var temp = $("#curr1").val();
	$("#curr1").val($("#curr2").val());
	if($("#curr1").attr("disabled") == "disabled"){
		$("#curr1").removeAttr("disabled");
		$("#curr2").attr("disabled","disabled");
	}else{
		if($("#curr2").attr("disabled") == "disabled"){
			$("#curr2").removeAttr("disabled");
			$("#curr1").attr("disabled","disabled");
		}
	}
	$("#curr2").val(temp);
}

function convert(){
	var input = {
		amount: $("#amount").val(),
		curr1: $("#curr1").val(),
		curr2: $("#curr2").val(),
		getCurr1: function(){
			return this.curr1;
		},
		getCurr2: function(){
			return this.curr2;
		},
		getAmount: function(){
			return this.amount;
		}
	};
	return input;
}

function Kantor(name,adress,timeOpen,timeClose,coordinates) {
  this.name = name;
  this.adress = adress;
  this.timeOpen = timeOpen;
  this.timeClose = timeClose;
  this.coordinates = coordinates;
  this.rate = 0;
  
  this.checkAval = function(){
	  var current = new Date();
	  var open = new Date();
	  var close = new Date();
	  var inputOpen = this.timeOpen.split(":");
	  var inputClose = this.timeClose.split(":");
	  open.setHours(inputOpen[0], inputOpen[1], 0, 0);
	  close.setHours(inputClose[0], inputClose[1], 0, 0);
	  if(current>open && current<close){
		  return "yes";
	  }else{
		  return "no";
	  }
  }
  this.calculate = function(input){
	var result = 0;
	
	result = input.amount * this.rate;
	result = Math.round(result * 100) / 100;
	return result;
  }	
  
  /*this.getRate = function(rate) {
    return this.rate;
  };*/
};

function showInfo(i){
	  var kantory = [kantor_baksy(),kantor_dotus(),kantor_grosz(),kantor_kantory2(),kantor_lodzinscy(),kantor_meritum(),kantor_vabanque()];	
	  kantory.sort(function(a, b){
		return b.rate - a.rate;
	  });
	  var info = document.getElementById("info");
	  info.innerHTML="";
	  var table = document.createElement("table");
	  info.appendChild(table);
	  
	  var row = table.insertRow(0);
	  var td_map = row.insertCell(0);
	  
	  var mapContainer = document.createElement("div");
	  td_map.appendChild(mapContainer);
	  var iframe = document.createElement("iframe");
	  iframe.setAttribute("width","220");
	  iframe.setAttribute("height","180");
	  iframe.setAttribute("frameborder","0");
	  iframe.setAttribute("scrolling","yes");
	  iframe.setAttribute("marginheight","0");
	  iframe.setAttribute("marginwidth","0");
	  iframe.setAttribute("src",kantory[i].coordinates);
	  mapContainer.appendChild(iframe);
	  
	  var td_info = row.insertCell(1);
	  td_info.innerHTML = "Name: " + kantory[i].name + "<br>" + "Open: " + kantory[i].timeOpen + "<br>" + "Close: " + kantory[i].timeClose + "<br>" + "Address: " + kantory[i].adress;
 }

function p(){
	
	var input = convert();
	
	var kantory = [kantor_baksy(),kantor_dotus(),kantor_grosz(),kantor_kantory2(),kantor_lodzinscy(),kantor_meritum(),kantor_vabanque()];
	
	kantory.sort(function(a, b){
		return b.rate - a.rate;
	});
	
	
	var table = document.getElementById("table");
	
	table.innerHTML = "";
	
	for(var i = 0; i<kantory.length; i++){
		var tr = table.insertRow(i);
		var td_name = tr.insertCell(0);
		var td_rate = tr.insertCell(1);
		var td_aval = tr.insertCell(2);
		td_name.innerHTML = kantory[i].name;
		td_rate.innerHTML = kantory[i].calculate(input);
		td_aval.innerHTML = kantory[i].checkAval();
		tr.setAttribute("onclick","showInfo(" + i + ")");
	}
	
}

function kantor_baksy(){
	var input = convert();
	var kantor = new Kantor("BaksyPl","ul. Krolewska 82, 30-079 Krakow","09:00","19:00","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4306.756012424332!2d19.91880201224355!3d50.071074020333604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165bafa6a79d93%3A0x288acd8d5fc90904!2sKr%C3%B3lewska+82%2C+33-332+Krak%C3%B3w!5e0!3m2!1sru!2spl!4v1495287309807");
	$.getJSON("http://v-ie.uek.krakow.pl/~s180753/kantor_api/baksyPl.json",function(json){
		if(input.getCurr2() == "pln"){
			switch(input.getCurr1()){
				case "usd": kantor.rate = json[0].Sprzedaz;break;
				case "eur": kantor.rate = json[1].Sprzedaz;break;
				case "gbp": kantor.rate = json[23].Sprzedaz;break;
				case "czk": kantor.rate = json[5].Sprzedaz;break;
				case "aud": kantor.rate = json[2].Sprzedaz;break;
				case "cad": kantor.rate = json[9].Sprzedaz;break;
			}
		}else{
			switch(input.getCurr2()){
				case "usd": kantor.rate = json[0].Skup;break;
				case "eur": kantor.rate = json[1].Skup;break;
				case "gbp": kantor.rate = json[23].Skup;break;
				case "czk": kantor.rate = json[5].Skup;break;
				case "aud": kantor.rate = json[2].Skup;break;
				case "cad": kantor.rate = json[9].Skup;break;
			}
		}
				
	});
	kantor.rate = kantor.rate/100;
	return kantor;
}

function kantor_dotus(){
	var input = convert();
	var kantor = new Kantor("Dotus","ul. Limanowskiego 20,30-534 KrakГіw","09:00","18:00","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.207693834193!2d19.95125201534122!3d50.04494047942152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b44fba3c521%3A0xce360ca250cd8532!2sBoles%C5%82awa+Limanowskiego+20%2C+33-332+Krak%C3%B3w!5e0!3m2!1sru!2spl!4v1495287428129");
	$.getJSON("http://v-ie.uek.krakow.pl/~s180753/kantor_api/dotus.json",function(json){
			if(input.getCurr2() == "pln"){
			switch(input.getCurr1()){
				case "usd": kantor.rate = json[0].Sprzedaz;break;
				case "eur": kantor.rate = json[1].Sprzedaz;break;
				case "gbp": kantor.rate = json[2].Sprzedaz;break;
				case "czk": kantor.rate = json[10].Sprzedaz;break;
				case "aud": kantor.rate = json[7].Sprzedaz;break;
				case "cad": kantor.rate = json[4].Sprzedaz;break;
			}
		}else{
			switch(input.getCurr2()){
				case "usd": kantor.rate = json[0].Kupno;break;
				case "eur": kantor.rate = json[1].Kupno;break;
				case "gbp": kantor.rate = json[2].Kupno;break;
				case "czk": kantor.rate = json[10].Kupno;break;
				case "aud": kantor.rate = json[7].Kupno;break;
				case "cad": kantor.rate = json[4].Kupno;break;
			}
		}
				
	});
	return kantor;
}

function kantor_grosz(){
	var input = convert();
	var kantor = new Kantor("Grosz","SЕ‚awkowska 4, 33-332 Krakow","09:00","18:00","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.2373810917147!2d19.934821915341992!3d50.06311587942373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b0e411f4be1%3A0xe39a151e51e82d7c!2zU8WCYXdrb3dza2EgNCwgMzMtMzMyIEtyYWvDs3csINCf0L7Qu9GM0YjQsA!5e0!3m2!1sru!2sua!4v1495286886689");
	$.getJSON("http://v-ie.uek.krakow.pl/~s180753/kantor_api/kantorGrosz.json",function(json){
	
		if(input.getCurr2() == "pln"){
			switch(input.getCurr1()){
				case "usd": kantor.rate = json[0].sprzedaz;break;
				case "eur": kantor.rate = json[1].sprzedaz;break;
				case "gbp": kantor.rate = json[9].sprzedaz;break;
				case "czk": kantor.rate = json[11].sprzedaz;break;
				case "aud": kantor.rate = json[2].sprzedaz;break;
				case "cad": kantor.rate = json[5].sprzedaz;break;
			}
		}else{
			switch(input.getCurr2()){
				case "usd": kantor.rate = json[0].kupno;break;
				case "eur": kantor.rate = json[1].kupno;break;
				case "gbp": kantor.rate = json[9].kupno;break;
				case "czk": kantor.rate = json[11].kupno;break;
				case "aud": kantor.rate = json[2].kupno;break;
				case "cad": kantor.rate = json[5].kupno;break;
			}
		}
				
	});
	kantor.rate = kantor.rate/100;
	return kantor;
}

function kantor_kantory2(){
	var input = convert();
	var kantor = new Kantor("Kantory2","pl. Szczepanski 8, 31-011 Krakow","10:00","17:30","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.208457914812!2d19.93391751534206!3d50.06365757942395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b0e5a3f024b%3A0xd5de5842e9eccb7b!2splac+Szczepa%C5%84ski+8%2C+33-332+Krak%C3%B3w!5e0!3m2!1sru!2spl!4v1495287473569");

	$.getJSON("http://v-ie.uek.krakow.pl/~s180753/kantor_api/kantory2.json",function(json){
				if(input.getCurr2() == "pln"){
			switch(input.getCurr1()){
				case "usd": kantor.rate = json[0].Sprzedaz;break;
				case "eur": kantor.rate = json[1].Sprzedaz;break;
				case "gbp": kantor.rate = json[5].Sprzedaz;break;
				case "czk": kantor.rate = json[10].Sprzedaz;break;
				case "aud": kantor.rate = json[3].Sprzedaz;break;
				case "cad": kantor.rate = json[2].Sprzedaz;break;
			}
		}else{
			switch(input.getCurr2()){
				case "usd": kantor.rate = json[0].Zakup;break;
				case "eur": kantor.rate = json[1].Zakup;break;
				case "gbp": kantor.rate = json[5].Zakup;break;
				case "czk": kantor.rate = json[10].Zakup;break;
				case "aud": kantor.rate = json[3].Zakup;break;
				case "cad": kantor.rate = json[2].Zakup;break;
			}
		}
				
	});
	kantor.rate = kantor.rate/100;
	return kantor;
}

function kantor_lodzinscy(){
	var input = convert();
	var kantor = new Kantor("Lodzinscy","Pilotow 6, Krakow","09:00","14:00","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.3764798742477!2d19.969754206358395!3d50.07923779847444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165adce147f495%3A0xc21dfa7435b51364!2zUGlsb3TDs3cgNiwgS3Jha8Ozdw!5e0!3m2!1sru!2spl!4v1495287520136");
	$.getJSON("http://v-ie.uek.krakow.pl/~s180753/kantor_api/lodzinscy.json",function(json){
				if(input.getCurr2() == "pln"){
			switch(input.getCurr1()){
				case "usd": kantor.rate = json[0].SPRZEDAZ;break;
				case "eur": kantor.rate = json[1].SPRZEDAZ;break;
				case "gbp": kantor.rate = json[2].SPRZEDAZ;break;
				case "czk": kantor.rate = json[9].SPRZEDAZ;break;
				case "aud": kantor.rate = json[8].SPRZEDAZ;break;
				case "cad": kantor.rate = json[7].SPRZEDAZ;break;
			}
		}else{
			switch(input.getCurr2()){
				case "usd": kantor.rate = json[0].SKUP;break;
				case "eur": kantor.rate = json[1].SKUP;break;
				case "gbp": kantor.rate = json[2].SKUP;break;
				case "czk": kantor.rate = json[9].SKUP;break;
				case "aud": kantor.rate = json[8].SKUP;break;
				case "cad": kantor.rate = json[7].SKUP;break;
			}
		}
				
	});
	return kantor;
}

function kantor_meritum(){
	var input = convert();
	var kantor = new Kantor("Meritum","pl. Imbramowski 2 ul Opolska 31-217 Krakow","08:30","17:30","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.779147960694!2d19.941814415343206!3d50.09042167942729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165af62fa61c29%3A0x58875b16e6bff2df!2sImbramowska+2%2C+Krak%C3%B3w!5e0!3m2!1sru!2spl!4v1495287566191");

	$.getJSON("http://v-ie.uek.krakow.pl/~s180753/kantor_api/meritum.json",function(json){
				if(input.getCurr2() == "pln"){
			switch(input.getCurr1()){
				case "usd": kantor.rate = json[1].Sprzedaz;break;
				case "eur": kantor.rate = json[0].Sprzedaz;break;
				case "gbp": kantor.rate = json[2].Sprzedaz;break;
				case "czk": kantor.rate = json[9].Sprzedaz;break;
				case "aud": kantor.rate = json[8].Sprzedaz;break;
				case "cad": kantor.rate = json[7].Sprzedaz;break;
			}
		}else{
			switch(input.getCurr2()){
				case "usd": kantor.rate = json[1].Kupno;break;
				case "eur": kantor.rate = json[0].Kupno;break;
				case "gbp": kantor.rate = json[2].Kupno;break;
				case "czk": kantor.rate = json[9].Kupno;break;
				case "aud": kantor.rate = json[8].Kupno;break;
				case "cad": kantor.rate = json[7].Kupno;break;
			}
		}
				
	});
	return kantor;
}

function kantor_vabanque(){
	var input = convert();
	var kantor = new Kantor("Vabanque","ul. Wielopole 13,31-072 Krakow","09:00","18:00","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.4892278398993!2d19.94236431534181!3d50.05839887942324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b1470f42d31%3A0xe521e55a62fa9fca!2sWielopole+13%2C+33-332+Krak%C3%B3w!5e0!3m2!1sru!2spl!4v1495287589377");
	$.getJSON("http://v-ie.uek.krakow.pl/~s180753/kantor_api/vabanque.json",function(json){
		
		if(input.getCurr2() == "pln"){
			switch(input.getCurr1()){
				case "usd": kantor.rate = json[0].sprzedaz;break;
				case "eur": kantor.rate = json[1].sprzedaz;break;
				case "gbp": kantor.rate = json[2].sprzedaz;break;
				case "czk": kantor.rate = json[9].sprzedaz;break;
				case "aud": kantor.rate = json[5].sprzedaz;break;
				case "cad": kantor.rate = json[3].sprzedaz;break;
			}
		}else{
			switch(input.getCurr2()){
				case "usd": kantor.rate = json[0].kupno;break;
				case "eur": kantor.rate = json[1].kupno;break;
				case "gbp": kantor.rate = json[2].kupno;break;
				case "czk": kantor.rate = json[9].kupno;break;
				case "aud": kantor.rate = json[5].kupno;break;
				case "cad": kantor.rate = json[3].kupno;break;
			}
		}
				
	});
	return kantor;
}


