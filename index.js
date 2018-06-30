function run(genFunc)
{
	const genObject = genFunc();
	function iterate(iteration)
	{
		if(iteration.done)
			return Promise.resolve(iteration.value);
		return Promise.resolve(iteration.value)
		.then(x => iterate(genObject.next(x)))
		.catch(x => iterate(genObject.throw(x)));
	}
	try
	{
		return iterate(genObject.next());
	}
	catch(ex)
	{
		return Promise.reject(ex);
	}
}

function* gen()
{
	var select1 = document.getElementById("compare1").value;
	var select2 = document.getElementById("compare2").value;
	if(select1 == select2)
		throw new Error("Both Choice are the Same. Please choose two different ships for comparison.");
	
	var td_list = document.getElementsByTagName("td");
	for( i = 0 ; i < td_list.length ; i++)
		td_list[i].style.background ="white";
	
	var ship1Response = yield fetch("https://swapi.co/api/starships/" +select1+ "/?format=json");
	var ship1 = yield ship1Response.json();
		
	var ship1_name = ship1.name;
	var ship1_cost = parseInt(ship1.cost_in_credits);
	var ship1_speed = parseInt(ship1.max_atmosphering_speed);
	var ship1_cargo = parseInt(ship1.cargo_capacity);
	var ship1_pssg = parseInt(ship1.passengers);
	
	document.getElementById("ship1_name").innerHTML = ship1_name;
	document.getElementById("ship1_cost").innerHTML = ship1_cost;
	document.getElementById("ship1_speed").innerHTML = ship1_speed;
	document.getElementById("ship1_cargo").innerHTML = ship1_cargo;
	document.getElementById("ship1_pssg").innerHTML = ship1_pssg;	
	
	var ship2Response = yield fetch("https://swapi.co/api/starships/" +select2+ "/?format=json");
	var ship2 = yield ship2Response.json();
		
	var ship2_name = ship2.name;
	var ship2_cost = parseInt(ship2.cost_in_credits);
	var ship2_speed = parseInt(ship2.max_atmosphering_speed);	
	var ship2_cargo = parseInt(ship2.cargo_capacity);
	var ship2_pssg = parseInt(ship2.passengers);
	
	document.getElementById("ship2_name").innerHTML = ship2_name;
	document.getElementById("ship2_cost").innerHTML = ship2_cost;
	document.getElementById("ship2_speed").innerHTML = ship2_speed;
	document.getElementById("ship2_cargo").innerHTML = ship2_cargo;
	document.getElementById("ship2_pssg").innerHTML = ship2_pssg;	
	
	if(ship1_cost != ship2_cost)
	{
		if(ship1_cost > ship2_cost)
			document.getElementById("ship1_cost").style.background = 'red';
		else
			document.getElementById("ship2_cost").style.background = 'red';		
	}
	
	if(ship1_speed != ship2_speed)		
	{
		if(ship1_speed > ship2_speed)
			document.getElementById("ship1_speed").style.background = 'red';
		else
			document.getElementById("ship2_speed").style.background = 'red';	
	}
	
	if(ship1_cargo != ship2_cargo)		
	{
		if(ship1_cargo > ship2_cargo)
			document.getElementById("ship1_cargo").style.background = 'red';
		else
			document.getElementById("ship2_cargo").style.background = 'red';	
	}
	
	if(ship1_pssg != ship2_pssg)		
	{
		if(ship1_pssg > ship2_pssg)
			document.getElementById("ship1_pssg").style.background = 'red';
		else
			document.getElementById("ship2_pssg").style.background = 'red';			
	}
}

function change_style(val)
{
	alert(val);
}

document.getElementById("compare_ship").addEventListener('click',function()
{
	run(gen).catch(function(err)
	{
		alert(err.message);
	});
	
});