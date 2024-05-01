


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {lat: 12.480, lng: 78.194}
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  document.getElementById('play').addEventListener('click', function() {
    geocodeLatLng(geocoder, map, infowindow);
  });
  var lats=document.getElementById('lat').value;
  var long=document.getElementById('long').value;
  var latlng = {lat: parseFloat(lats), lng: parseFloat(long)};

  /*var cityCircle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: latlng,
    radius: Math.sqrt(2) 
  });*/
}

function geocodeLatLng(geocoder, map, infowindow) {
  //var input = document.getElementById('latlng').value;
  //var latlngStr = input.split(',', 2);
  var lats=document.getElementById('lat').value;
  var long=document.getElementById('long').value;
  var latlng = {lat: parseFloat(lats), lng: parseFloat(long)};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        /*var cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: latlng,
          radius: Math.sqrt(2) 
        });*/
        document.getElementById("demo").innerHTML=results[0].formatted_address;
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
        //infowindow.open(map, cityCircle);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
