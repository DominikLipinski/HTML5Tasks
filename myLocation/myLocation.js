window.onload = getMyLocation;

function getMyLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation);
    }else{
        alert("No geolocation support here :-(");
    }
}

function displayLocation(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var div = document.getElementById("location");
    div.innerHTML = "Your coordinates are: latitude: "+latitude+", longitude: "+longitude;
}