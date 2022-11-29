"use strict"

window.onload = function () {

    let SearchFilter = document.getElementById("SearchFilter");
    SearchFilter.onchange = addDropdowns;

    let locationSearch = document.getElementById("locationSearch");
    locationSearch.onchange = locationSearchOnChange;

    let parkTypeSearch = document.getElementById("parkTypeSearch");
    parkTypeSearch.onchange = searchByParkOnChange;

    let locationResult = document.getElementById("locationResult");
    locationResult.onchange = displayResultOnChange;

    document.getElementById("locationSearch").style.display = "none";
    document.getElementById("parkTypeSearch").style.display = "none";
    document.getElementById("locationResult").style.display = "none";
    document.getElementById("parksDescription").style.display = "none";
}

function addDropdowns() {

    document.getElementById("locationSearch").style.display = "none";
    document.getElementById("parkTypeSearch").style.display = "none";
    document.getElementById("parksDescription").style.display = "none";
    document.getElementById("locationResult").style.display = "none";

    let SearchFilter = document.getElementById("SearchFilter").value;

    if (SearchFilter == "Location") {
        document.getElementById("locationSearch").style.display = "block";
        addOptionsOnLocation();

    } else if (SearchFilter == "Park Type") {
        document.getElementById("parkTypeSearch").style.display = "block";
        addOptionsOnPark()

    }

    else if (SearchFilter == "") {
        document.getElementById("locationSearch").style.display = "none";
        document.getElementById("parkTypeSearch").style.display = "none";
    }

}


function addOptionsOnLocation() {

    let locationSearch = document.getElementById("locationSearch");

    let newOption = document.createElement("option");
    newOption.value = "";
    newOption.text = "Please Select a State";
    locationSearch.appendChild(newOption);

    for (let location of locationsArray) {
        let newOption = document.createElement("option");
        newOption.value = location;
        newOption.textContent = location;
        locationSearch.appendChild(newOption);

    }
}


function addOptionsOnPark() {

    let parkTypeSearch = document.getElementById("parkTypeSearch");

    parkTypeSearch.length = 0;
    let option = document.createElement("option");
    option.value = "";
    option.text = "Please Select a Park Type";
    parkTypeSearch.appendChild(option);

    for (let park of parkTypesArray) {
        let parkOption = document.createElement("option");
        parkOption.value = park;
        parkOption.textContent = park;
        parkTypeSearch.appendChild(parkOption);

    }

}


function locationSearchOnChange() {

    document.getElementById("parksDescription").style.display = "none";

    let locationSearch = document.getElementById("locationSearch").value;
    let result = document.getElementById("locationResult")

    result.length = 0;

    let newOption = document.createElement("option");
    newOption.value = "";
    newOption.text = "Please Select a Park ";
    result.appendChild(newOption);

    for (let place of nationalParksArray) {

        if (locationSearch == place.State) {
            let newOption = document.createElement("option");
            newOption.value = place.LocationName;
            newOption.text = place.LocationName;
            result.appendChild(newOption);

            result.style.display = "block";

        } else if (locationSearch == "") {

            result.style.display = "none"
        }
    }
}


function searchByParkOnChange() {
    // Continue Hiding The Element
    document.getElementById("locationResult").style.display = "none";
    document.getElementById("parksDescription").style.display = "none";

    let parkTypeSearch = document.getElementById("parkTypeSearch").value;
    let result = document.getElementById("locationResult");

    result.length = 0;

    let option = document.createElement("option");
    option.value = "";
    option.text = "Please Select a Park";
    result.appendChild(option);

    for (let park of nationalParksArray) {
        if (park.LocationName.indexOf(parkTypeSearch) != -1 && parkTypeSearch != "") {
            let newOption = document.createElement("option");
            newOption.value = park.LocationName;
            newOption.text = park.LocationName;
            result.appendChild(newOption);

            result.style.display = "block";
        }
    }
}

// Shows selected park in a container
function displayResultOnChange() {

    let result = document.getElementById("locationResult");
    let parksDescription = document.getElementById("parksDescription");

    for (let park of nationalParksArray) {
        if (result.value == park.LocationName) {

            parksDescription.style.display = "block"
            parksDescription.innerHTML = "<span style='color: Grey ; '>Name : </span>" + park.LocationName + "<br/>" + "<span style='color: grey;'>Address : </span>" + park.Address + "<br/>" + "<span style='color: grey;'>City : </span>" + park.City + "<br/>" + "<span style='color: grey;'>State : </span>" + park.State + "<br/>" + "<span style='color: grey;'>Zip Code : </span>" + park.ZipCode + "<br/>" + "<span style='color: grey;'>Latitude : </span>" + park.Latitude + "<br/>" + "<span style='color: grey;'>Longitude : </span>" + park.Longitude + "<br/>";

        } else if (result.value == "") {
            parksDescription.style.display = "none"

        }
        if (park.Visit != undefined && result.value == park.LocationName) {
            parksDescription.innerHTML += "<span style='color: Grey;'>Visit : </span> <a href =" + park.Visit + " target = '_blank'>" + park.Visit + "</a>"

        }
    }
}

