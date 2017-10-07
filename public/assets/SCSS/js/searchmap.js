var mapStyles = [{
    'elementType': 'geometry',
    'stylers': [{
        'color': '#f5f5f5'
    }]
},
{
    'elementType': 'labels.icon',
    'stylers': [{
        'visibility': 'off'
    }]
},
{
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#616161'
    }]
},
{
    'elementType': 'labels.text.stroke',
    'stylers': [{
        'color': '#f5f5f5'
    }]
},
{
    'featureType': 'administrative.land_parcel',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#bdbdbd'
    }]
},
{
    'featureType': 'poi',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#eeeeee'
    }]
},
{
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#757575'
    }]
},
{
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#e5e5e5'
    }]
},
{
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#9e9e9e'
    }]
},
{
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#ffffff'
    }]
},
{
    'featureType': 'road.arterial',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#757575'
    }]
},
{
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#dadada'
    }]
},
{
    'featureType': 'road.highway',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#616161'
    }]
},
{
    'featureType': 'road.local',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#9e9e9e'
    }]
},
{
    'featureType': 'transit.line',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#e5e5e5'
    }]
},
{
    'featureType': 'transit.station',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#eeeeee'
    }]
},
{
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#c9c9c9'
    }]
},
{
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [{
        'color': '#9e9e9e'
    }]
}
];

var id = document.getElementById('map-canvas');
if(id){
    function initMap() {
      var map = new google.maps.Map( id, {
        center: {lat: -33.91722, lng: 151.23064},
        zoom: 14,
        styles:mapStyles
      });

      var input = document.getElementById('listingAddress');


      var autocomplete = new google.maps.places.Autocomplete(input);

      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo('bounds', map);

      var infowindow = new google.maps.InfoWindow();
      var infowindowContent = document.getElementById('infowindow-content');
      infowindow.setContent(infowindowContent);
      var image = '../img/map/marker.png';
      var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29),
        icon : image
      });

      autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
      });
      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
    }
}
