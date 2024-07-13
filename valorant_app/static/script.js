document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.href === window.location.href) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
  }
});

// Selecting buttons
let agentButton = document.getElementById('agent-button');
let mapButton = document.getElementById('map-button');
let resetButton = document.getElementById('reset-button');


// Adding event listeners if the elements exist
if (agentButton) {
  agentButton.addEventListener('click', getAgentRole);
}
if (mapButton) {
  mapButton.addEventListener('click', getMaps);
}
if (resetButton) {
  resetButton.addEventListener('click', resetSelection);
}


// Function to get agents from API and get checkbox values
function getAgentRole() {
  fetch('/get_agents/').then(response => response.json()).then(valAPI => {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let selectedRole = Array.from(checkboxes).map(x => x.value);
    let agentList = [];
    let alertMessage = document.getElementById('alert-message')

    if (checkboxes.length === 0) {
      alertMessage.classList.remove('hide')

    } else {
      alertMessage.classList.add('hide')
      valAPI.forEach(function(agent) {

        if (selectedRole.includes(agent.role)) {
          agentList.push(agent);
        }
      })
      getRandomAgent(agentList)
    }
  })
}



// Function to get maps from API
function getMaps() {
  fetch('/get_maps/').then(response => response.json()).then(mapList => {
    let radioButton = document.querySelector('input[name=gamemode]:checked').value;
    let customsMap = [];
    let tdm_map = [];

    mapList.forEach(function(maps) {
      if (maps.map_sites == null) {
        tdm_map.push(maps);

      } else {
        customsMap.push(maps);
      }
    })

    if (radioButton == 'Customs') {
      randomMap(customsMap);

    } else {
      let getRangeMap = Array.from(tdm_map).map(x => x.map_name);
      let rangeMap = getRangeMap.indexOf('The Range');
      tdm_map.pop(rangeMap);

      randomMap(tdm_map);
    }
  })
}



// Function to get random agents for player-item div
function getRandomAgent(agent) {
  let playerItem = document.querySelectorAll('.player-item');
  let totalAgents = agent.length;
  let usedAgents = new Set();

  playerItem.forEach(function(element) {
    let counter = 0;

    let intervalId = setInterval(function() {
      let randomAgent;

      if (counter == 25) {
        clearInterval(intervalId);
        randomAgent = Math.floor(Math.random() * totalAgents);

        while (usedAgents.has(randomAgent) && usedAgents.size < totalAgents) {
          randomAgent = Math.floor(Math.random() * totalAgents);
        }
        usedAgents.add(randomAgent);

        let img = agent[randomAgent].picture;
        let name = agent[randomAgent].name;
        let role = agent[randomAgent].role;
        let description = agent[randomAgent].description;
    
        element.innerHTML = `
        <img class="default-pic" src="${img}">
        <div>
          <h1 class="name-item">${name}</h1>
          <b class="role-item">${role}</b>
          <p class="description-item">${description}</p>
        </div>`;

      } else {
        randomAgent = Math.floor(Math.random() * totalAgents);
        let img = agent[randomAgent].picture;
        let name = agent[randomAgent].name;
        let role = agent[randomAgent].role;
        let description = agent[randomAgent].description;
    
        element.innerHTML = `
        <img class="default-pic" src="${img}">
        <div>
          <h1 class="name-item">${name}</h1>
          <b class="role-item">${role}</b>
          <p class="description-item">${description}</p>
        </div>`;
      }
      counter++
    }, 100);
  })
}


// Function to fetch random map
function randomMap(mapList) {
  let counter = 0;
  let intervalId = setInterval(function() {
    let randomMap;

    if (counter == 20) {
      clearInterval(intervalId);
      let mapImg = document.getElementById('map-img');
      let mapName = document.getElementById('map-name');
      let totalMaps = mapList.length;
      randomMap = Math.floor(Math.random() * totalMaps);
      mapName.innerHTML = mapList[randomMap].map_name;
      mapImg.src = mapList[randomMap].map_img_url;

    } else {
      let mapName = document.getElementById('map-name');
      let totalMaps = mapList.length;
      randomMap = Math.floor(Math.random() * totalMaps);
      mapName.innerHTML = mapList[randomMap].map_name;
    }
    counter++
  }, 100)
}



// Function to clear selections
function resetSelection() {
  let playerItems = document.querySelectorAll('.player-item');
  let mapName = document.getElementById('map-name');
  let mapImg = document.getElementById('map-img');
  let alertMessage = document.getElementById('alert-message');
  let checkboxes = document.querySelectorAll('.role-checkbox');

  for (let i=0; i<checkboxes.length; i++) {
    checkboxes[i].checked = true;
  }

  alertMessage.classList.add('hide');
  mapName.innerHTML = `Click 'Random Map!'`;
  mapImg.src = 'https://valorant-randomizer-bucket.s3.us-east-2.amazonaws.com/img/valorant-title.jpg';

  playerItems.forEach(function(element) {
    element.innerHTML = `
        <img class="default-pic" src="https://valorant-randomizer-bucket.s3.us-east-2.amazonaws.com/img/default-avatar.jpg">
        <div>
          <h1 class="name-item">Agent Name</h1>
          <b class="role-item">Role</b>
          <p class="description-item">Description</p>
        </div>`;
  });
}