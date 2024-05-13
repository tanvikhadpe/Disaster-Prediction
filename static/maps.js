var map;
            function initMap() {
              map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8,-187.3),
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
            }
      
            // Loop through the results array and place a marker for each
            // set of coordinates.
            window.eqfeed_callback = function(results) {
              for (var i = 0; i < results.features.length; i++) {
                var coords = results.features[i].geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1],coords[0]);
                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map
                });
              }
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