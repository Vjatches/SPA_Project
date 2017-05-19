
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
/**
function convert(){
	var input = {
		amount: $("#amount").val(),
		curr1: $("#curr1").val(),
		curr2: $("#curr2").val()
	};
	return input;
}

function calculate(input, kantor){
	var result;
	result = input.amount * kantor.rate;
	return result;
}

var kantor = [
{
	name: "test",
	adress: "ul. Testowa 25",
	timeOpen: "00:00",
	timeClose: "18:00",
	coordinates: [-34.397, 150.644],
	USD: {
			buy: 0,
			sell: 0
		   },
	EUR: {
		buy: 0,
		sell: 0
	},
	UAH: {
		buy: 0,
		sell: 0
		},
	GBP: {
		buy: 0,
		sell: 0
	},
	RUB: {
		buy: 0,
		sell: 0
	}
},

];

fuction parsing(){
	for(var i = 0; i<7; i++){
		.getJSON("http://v-ie.uek.krakow.pl/~s180753/poland.json",function(json)){
			if( $(#curr1).val() == "USD" && $(#curr2).val() == "PLN"){
				
			}
		}
	}
}

function compareDate(){
	var open = new Date("2017-03-25T"+kantor.timeOpen+"Z");
	var close = new Date(kantor.timeClose);
	var b = new Date();
	if(b>open$$b<close){
	true;	
	} else {false};
}
*/
