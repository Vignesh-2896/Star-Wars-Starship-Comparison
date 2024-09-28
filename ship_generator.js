(function (window) {
  let arr = [2, 3, 10, 28, 29, 39, 58, 59, 63, 65, 74, 75];
  arr.forEach(run_fetch);

  function run_fetch(fetch_id) {
    fetch("https://swapi.dev/api/starships/" + fetch_id + "/?format=json")
      .then(function (result) {
        return result.json();
      })
      .then(function (result) {
        inject_similar(result.name, fetch_id);
      });
  }

  function inject_similar(option_value, option_id) {
    let option = document.createElement("option");
    option.innerHTML = option_value;
    option.setAttribute("value", option_id);

    document.getElementById("compare1").appendChild(option);

    option = document.createElement("option");
    option.innerHTML = option_value;
    option.setAttribute("value", option_id);

    document.getElementById("compare2").appendChild(option);
  }
})(window);
