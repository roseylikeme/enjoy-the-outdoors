"use strict";

// Through initializing these variables outside, each function can grab & no need for repeat code
const mtnList = document.getElementById("mtnList");
const mtnInfo = document.getElementById("mtnInfo");
const mtnInfoCard = document.getElementById("mtnInfoCard");
const mtnInfoCardTitle = document.getElementById("mtnCardTitle");
const mtnInfoCardImg = document.getElementById("mtnInfoCardImg");
let option = new Option("Select a mountain", "select");
mtnList.appendChild(option);

mtnInfoCard.style.display = "none";

window.onload = function init() {
    initMountainsList();
    mtnList.onchange = displayInfo;
}

function initMountainsList() {
    for (let mountain of mountainsArray) {
        let option = new Option(mountain.name, mountain.name);
        mtnList.appendChild(option);
    }
}

async function getSunsetForMountain(lat, lng){
    let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}

function displayInfo() {
    mtnInfo.innerHTML = "";
    for (let mountain of mountainsArray) {
        if (mtnList.value == "select") {
            mtnInfoCard.style.display = "none";

        }
        else if (mountain.name == mtnList.value) {
            mtnInfoCardTitle.innerText = mountain.name;
            mtnInfo.innerHTML += "<span class='fw-bold'>Elevation: </span>" + mountain.elevation + "<br><span class='fw-bold'>Coordinates: </span>" + mountain.coords.lat + ", " + mountain.coords.lng;
            getSunsetForMountain(mountain.coords.lat, mountain.coords.lng).then(data => {
                mtnInfo.innerHTML += "<br><span class='fw-bold'>Sunrise Time: </span>" + data.results.sunrise +  "<br><span class='fw-bold'>Sunset Time: </span>" + data.results.sunset + "<br><span class='fw-bold'>Description: </span>" + mountain.desc;
            });
            mtnInfoCardImg.src = "images/" + mountain.img;
            mtnInfoCard.style.display = "block";
            break;
        }
    }
}

