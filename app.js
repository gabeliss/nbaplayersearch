const allPlayers_url = "https://www.balldontlie.io/api/v1/players";

document.addEventListener("submit", function(e) {
    e.preventDefault();
    const form = e.target;
    const first = form.elements['firstname'];
    let firstName = first.value;
    firstName = firstName.replace(/\s/g, "");
    const last = form.elements['lastname'];
    let lastName = last.value;
    lastName = lastName.replace(/\s/g, "");
    let playerName = firstName + "+" + lastName;
    const result = onePlayer_url(playerName);
    displayResult(result);
    first.value = null;
    last.value = null;
});


var onePlayer_url = (searchResult) => {
    let player_url = allPlayers_url + "?search=" + searchResult;
    return player_url;
}

async function displayResult(result) {
    const response = await fetch(result);
    const json = await response.json();
    var data = JSON.parse(JSON.stringify(json));
    console.log(data);
    data = data.data;
    console.log(data);
    $('.results-container').empty();

    for (let i = 0; i < data.length; i++) {
        const name = data[i].first_name + " " + data[i].last_name;
        const height = data[i].height_feet + "'" + data[i].height_inches;
        const position = data[i].position;
        const team = data[i].team.full_name;
        
        if (height !== "null'null") {
            $('.results-container').append("<h3 id=attribute > Name: " + name + "</h3>");
            $('.results-container').append("<p id=attribute > Team: " + team + "</p>");
            $('.results-container').append("<p id=attribute > Position: " + position + "</p>");
            $('.results-container').append("<p id=attribute > Height: " + height + "</p>");
        }
    }
}
