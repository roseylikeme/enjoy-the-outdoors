"use strict"

window.onload = function () {

    let SearchFilter = document.getElementById("SearchFilter");
    SearchFilter.onchange = addDropdowns;

    let locationsList = document.getElementById("locationsList");
    locationsList.onchange = locationsListOnChange;

    let parkTypeList = document.getElementById("parkTypeList");
    parkTypeList.onchange = searchByParkOnChange;

    let parkList = document.getElementById("parkList");
    parkList.onchange = displayResultOnChange;

    document.getElementById("locationsList").style.display = "none";
    document.getElementById("parkTypeList").style.display = "none";
    document.getElementById("parkList").style.display = "none";
    document.getElementById("parksDescription").style.display = "none";
}

function addDropdowns() {
    document.getElementById("locationsList").style.display = "none";
    document.getElementById("parkTypeList").style.display = "none";
    document.getElementById("parksDescription").style.display = "none";
    document.getElementById("parkList").style.display = "none";

    let SearchFilter = document.getElementById("SearchFilter").value;

    if (SearchFilter == "Location") {
        document.getElementById("locationsList").style.display = "block";
        searchByLocation();

    } else if (SearchFilter == "Park Type") {
        document.getElementById("parkTypeList").style.display = "block";
        searchByParkType()
    } else if (SearchFilter == "View All National Parks") {
        viewAllParks();
        parkList.style.display = "block";
    }
    else if (SearchFilter == "") {
        document.getElementById("locationsList").style.display = "none";
        document.getElementById("parkTypeList").style.display = "none";
    }

}

// Search By Location Filter
function searchByLocation() {
    console.log("Adding Search by Location Filter...")
    let locationsList = document.getElementById("locationsList");

    let newOption = document.createElement("option");
    newOption.value = "";
    newOption.text = "Please Select a State";
    locationsList.appendChild(newOption);

    for (let location of locationsArray) {
        let newOption = document.createElement("option");
        newOption.value = location;
        newOption.textContent = location;
        locationsList.appendChild(newOption);

    }
}

// Search By Park Type Filter
function searchByParkType() {
    console.log("Adding Search by Park Type Filter...")
    let parkTypeList = document.getElementById("parkTypeList");

    parkTypeList.length = 0;
    let option = document.createElement("option");
    option.value = "";
    option.text = "Please Select a Park Type";
    parkTypeList.appendChild(option);

    for (let park of parkTypesArray) {
        let parkOption = document.createElement("option");
        parkOption.value = park;
        parkOption.textContent = park;
        parkTypeList.appendChild(parkOption);

    }

}

// When Location is Selected
function locationsListOnChange() {
    console.log("A Location Was Selected...")
    document.getElementById("parksDescription").style.display = "none";

    let locationsList = document.getElementById("locationsList").value;
    let parkList = document.getElementById("parkList")

    parkList.length = 0;

    let newOption = document.createElement("option");
    newOption.value = "";
    newOption.text = "Please Select a Park ";
    parkList.appendChild(newOption);

    for (let place of nationalParksArray) {

        if (locationsList == place.State) {
            let newOption = document.createElement("option");
            newOption.value = place.LocationName;
            newOption.text = place.LocationName;
            parkList.appendChild(newOption);

            parkList.style.display = "block";

        } else if (locationsList == "") {

            parkList.style.display = "none"
        }
    }
}

// When a Park Type is Selected...
function searchByParkOnChange() {
    console.log("Park type was selected...")
    // Continue Hiding The Element
    document.getElementById("parkList").style.display = "none";
    document.getElementById("parksDescription").style.display = "none";

    let parkTypeList = document.getElementById("parkTypeList").value;
    let parkList = document.getElementById("parkList");

    parkList.length = 0;

    let option = document.createElement("option");
    option.value = "";
    option.text = "Please Select a Park";
    parkList.appendChild(option);

    for (let park of nationalParksArray) {
        if (park.LocationName.indexOf(parkTypeList) != -1 && parkTypeList != "") {
            let newOption = document.createElement("option");
            newOption.value = park.LocationName;
            newOption.text = park.LocationName;
            parkList.appendChild(newOption);

            parkList.style.display = "block";
        }
    }
}

// View All Parks Option [No Filter]
function viewAllParks() {
    console.log("Inititalized no filter")
    let parkList = document.getElementById("parkList")
    parksDescription.style.display = "none"
    parkList.length = 0;
    let parkOption = new Option("Select a park", "select"); // creates a select option for dropdown
    parkList.appendChild(parkOption); // adds "select a park" option to dropdown

    for (let park of nationalParksArray) {
        let newOption = document.createElement("option");
        newOption.value = park.LocationName;
        newOption.text = park.LocationName;
        parkList.appendChild(newOption);

        parkList.style.display = "block";
    } if (parkTypeList.value != "select") { 
        parkList.style.display = "block"
    } else {
        parkList.style.display = "none"
        parksDescription.style.display = "none"
    }
}

// Shows selected park in a container
function displayResultOnChange() {
    console.log("A specific park was selected...")
    let parkList = document.getElementById("parkList");
    let parksDescription = document.getElementById("parksDescription");

    for (let park of nationalParksArray) {
        if (parkList.value == park.LocationName) {
            parksDescription.style.display = "block"
            parksDescription.innerHTML = "<span style='color: Green; font-weight: bold'>Name : </span>" + park.LocationName + "<br/>" + "<span style='color: Green; font-weight: bold'>Address : </span>" + park.Address + "<br/>" + "<span style='color: Green; font-weight: bold'>City : </span>" + park.City + "<br/>" + "<span style='color: Green; font-weight: bold'>State : </span>" + park.State + "<br/>" + "<span style='color: Green; font-weight: bold'>Zip Code : </span>" + park.ZipCode + "<br/>" + "<span style='color: Green; font-weight: bold'>Latitude : </span>" + park.Latitude + "<br/>" + "<span style='color: Green; font-weight: bold'>Longitude : </span>" + park.Longitude + "<br/>";

        }
        // Visit property that contains a URL to a page about the park
        if (park.Visit != undefined && parkList.value == park.LocationName) {
            parksDescription.innerHTML += "<span style='color: Green; font-weight: bold'>Visit : </span> <a href =" + park.Visit + " target = '_blank'>" + park.Visit + "</a>"
        }
    }
}

