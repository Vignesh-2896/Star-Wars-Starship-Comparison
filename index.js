function run(genFunc) {
  const genObject = genFunc();
  function iterate(iteration) {
    if (iteration.done) return Promise.resolve(iteration.value);
    return Promise.resolve(iteration.value)
      .then((x) => iterate(genObject.next(x)))
      .catch((x) => iterate(genObject.throw(x)));
  }
  try {
    return iterate(genObject.next());
  } catch (ex) {
    return Promise.reject(ex);
  }
}

function* gen() {
  let select1 = document.getElementById("compare1").value;
  let select2 = document.getElementById("compare2").value;
  if (select1 == select2)
    throw new Error(
      "Both Choice are the Same. Please choose two different ships for comparison."
    );

  let td_list = document.getElementsByTagName("td");
  for (const element of td_list) element.style.background = "white";

  let ship1Response = yield fetch(
    "https://swapi.dev/api/starships/" + select1 + "/?format=json"
  );
  let ship1 = yield ship1Response.json();
  displayData(1, ship1);

  let ship2Response = yield fetch(
    "https://swapi.dev/api/starships/" + select2 + "/?format=json"
  );
  let ship2 = yield ship2Response.json();
  displayData(2, ship2);
  compareShips(ship1, ship2);
}

function displayData(index, shipData) {
  document.getElementById(`ship${index}_name`).innerHTML = shipData.name;
  document.getElementById(`ship${index}_cost`).innerHTML =
    shipData.cost_in_credits;
  document.getElementById(`ship${index}_speed`).innerHTML =
    shipData.max_atmosphering_speed;
  document.getElementById(`ship${index}_cargo`).innerHTML =
    shipData.cargo_capacity;
  document.getElementById(`ship${index}_pssg`).innerHTML = shipData.passengers;
}

function compareShips(ship1, ship2) {
  let shipProperties = ["cost", "speed", "cargo", "pssg"];
  for (let property of shipProperties) {
    if (ship1[property > ship2[property]])
      document.getElementById(`ship1_${property}`).style.background =
        "lightgreen";
    else
      document.getElementById(`ship2_${property}`).style.background =
        "lightgreen";
  }
}

document.getElementById("compare_ship").addEventListener("click", function () {
  run(gen).catch(function (err) {
    alert(err.message);
  });
});
