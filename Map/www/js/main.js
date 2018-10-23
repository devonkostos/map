var options;

window.onload = function()
{
    document.addEventListener('deviceready', init, false);
    init();
}
function init() 
{
    document.getElementById('btnLocation').style.display = "block";
    
    options = {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
    };
}
function getLocation()
{
    navigator.geolocation.getCurrentPosition(success, failure, options);
}
function success(position)
{
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    var timeS = position.timestamp;
    var dirNS = "";
    var dirEW = "";
    
    if (lat > 0)
        {
            dirNS = "N";
        }
    else //(lat < 0)
        {
            dirNS = "S";
        }
    if (long > 0)
        {
            dirEW = "E";
        }
    else //(long < 0)
        {
            dirEW = "W";
        }
    
    var output = "<strong>Latitude:</strong> " +  deg_to_dms(lat) + dirNS;
    output += "<br/><strong>Longitude:</strong> " + deg_to_dms(long) + dirEW;
    output += "<br/><strong>Accuracy:</strong> " + accuracy;
    output += "<br/><strong>Time Stamp: </strong>" + (new Date(timeS)).toUTCString();
    
    document.getElementById('result').innerHTML = output;
    
    var mapOptions = {
        center: {lat: lat, lng: long},
        zoom: 16,
        mapTypeId: 'hybrid'
    };
    
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: long},
        map: map
    });
}
function deg_to_dms(deg)
{
    var d = Math.floor(Math.abs(deg));
    var minfloat = (Math.abs(deg)-d)*60;
    var m = Math.floor(minfloat);
    var secfloat = (minfloat-m)*60;
    var s = Math.round(secfloat);
    
    if (s == 60)
        {
            m++;
            s = 0;
        }
    if (m == 60)
        {
            d++;
            m = 0;
        }
    
    return d + " degrees, " + m + " minutes, " + s + " seconds ";
}
function failure(message) 
{
    alert("Error: " + message.message);
}
function clearScreen()
{
    document.getElementById('map-canvas').innerHTML = "";
    document.getElementById('map-canvas').style.backgroundColor = "white";
    document.getElementById('result').innerHTML = "";
}