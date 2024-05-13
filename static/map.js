var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {lat: -33.865427, lng: 151.196123},
    mapTypeId: 'terrain'
  });

  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  document.getElementById('play').addEventListener('click', function() {
    geocodeLatLng(geocoder, map, infowindow);
  });

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);

  map.data.setStyle(function(feature) {
    var magnitude = feature.getProperty('mag');
    return {
      icon: getCircle(magnitude)
    };
  });
}

function getCircle(magnitude) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red',
    fillOpacity: .2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: 'white',
    strokeWeight: .5
  };
}

function eqfeed_callback(results) {
    map.data.addGeoJson(results);
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
          map.setZoom(2);
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
          document.getElementById("placess").value=results[0].formatted_address;
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