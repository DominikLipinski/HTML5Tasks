window.onload = getMyLocation;

function getMyLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    }else{
        alert("No geolocation support here :-(");
    }
}

function displayLocation(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");
    div.innerHTML = "Your coordinates are: latitude: "+latitude+", longitude: "+longitude;

    var km = computeDistance(position.coords, secretLocation);
    var distance = document.getElementById("distance");
    distance.innerHTML = "You're " + km + " from Secret Headquaters.";

    showMap(position.coords);
}

function displayError(error){
    var errorTypes = {
        0: "Unknown Error",
        1: "Acces not allowed",
        2: "Location not available",
        3: "Time limit exceeded"
    };

    var errorMessage = errorTypes[error.code];
    if(error.code==0||error.code==2){
        errorMessage=errorMessage+" "+error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords){
    var startLatRads = deegreesToRadians(startCoords.latitude),
        startLongRads = deegreesToRadians(startCoords.longitude),
        destLatRads = deegreesToRadians(destCoords.latitude),
        destLongRads = deegreesToRadians(destCoords.longitude),
        Radius = 6371,
        distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads)+
                   Math.cos(startLatRads)*Math.cos(destLatRads)*
                   Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function deegreesToRadians(degrees){
    var radians = (degrees *Math.PI)/180;
    return radians;
}

var secretLocation = {
    latitude: 50.288962,
    longitude: 18.659609
};

var map;
function showMap(coords){
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
    var mapOptions = {
    zoom: 10,
    center: googleLatAndLong,
    mapTypeId: google.maps.mapTypeId.ROADMAP
    };
    var div = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
}
