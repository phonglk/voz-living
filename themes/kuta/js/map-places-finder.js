var map, places, iw, shadow;
var markers = [];
var autocomplete;
var countryRestrict = { 'country': 'id' };
var MARKER_PATH = 'http://maps.gstatic.com/intl/en_us/mapfiles/marker_orange';
var SHADOW_URL = "../../../maps.gstatic.com/intl/en_us/mapfiles/markers/marker_sprite.png";
var hostnameRegexp = new RegExp('^https?://.+?/');

var countries = {
'id': {center: new google.maps.LatLng(-5,120),
  zoom: 4
},
'au': {
  center: new google.maps.LatLng(-25.3,133.8),
  zoom: 4
},
'br': {
  center: new google.maps.LatLng(-14.2,-51.9),
  zoom: 3
},
'ca': {
  center: new google.maps.LatLng(62,-110.0),
  zoom: 3
},
'fr': {
  center: new google.maps.LatLng(46.2,2.2),
  zoom: 5
},      
'de': {
  center: new google.maps.LatLng(51.2,10.4),
  zoom: 5
},
'mx': {
  center: new google.maps.LatLng(23.6,-102.5),
  zoom: 4
},
'nz': {
  center: new google.maps.LatLng(-40.9,174.9),
  zoom: 5
},
'it': {
  center: new google.maps.LatLng(41.9,12.6),
  zoom: 5
},
'za': {
  center: new google.maps.LatLng(-30.6,22.9),
  zoom: 5
},
'es': {
  center: new google.maps.LatLng(40.5,-3.7),
  zoom: 5
},
'pt':{
  center: new google.maps.LatLng(39.4,-8.2),
  zoom: 6
},
'us': {
  center: new google.maps.LatLng(37.1,-95.7),
  zoom: 3
},
'uk': {
  center: new google.maps.LatLng(54.8, -4.6),
  zoom: 5
}
};

$(document).ready(function(){	
	initialize();
});

function initialize() {
var myOptions = {
  zoom: countries['id'].zoom,
  center: countries['id'].center,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}

map = new google.maps.Map(document.getElementById("map-places-finder"), myOptions);
autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocompleteCity'), {
  types: [ 'geocode' ],
  componentRestrictions: countryRestrict
});
places = new google.maps.places.PlacesService(map);

google.maps.event.addListener(autocomplete, 'place_changed', function() {
  place_changed();
});

shadow = new google.maps.MarkerImage(
  SHADOW_URL,
  new google.maps.Size(32,37),
  new google.maps.Point(22,0),
  new google.maps.Point(8, 32)
);    
}

function place_changed() {
	var place = autocomplete.getPlace();
	map.panTo(place.geometry.location);
	map.setZoom(15);
	search();
}

function search() {    
var search = {
  bounds: map.getBounds(),
  types: [ 'lodging' ]
};

places.search(search, function(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
	clearResults();
	clearMarkers();
	for (var i = 0; i < results.length; i++) {
	  var markerLetter = String.fromCharCode("A".charCodeAt(0) + i);
	  var markerIcon = MARKER_PATH + markerLetter + ".png";
	  markers[i] = new google.maps.Marker({
		position: results[i].geometry.location,
		animation: google.maps.Animation.DROP,
		icon: markerIcon,
		shadow: shadow
	  });
	  google.maps.event.addListener(markers[i], 'click', getDetails(results[i], i));
	  setTimeout(dropMarker(i), i * 100);
	  addResult(results[i], i);
	}
  }
})
}

function clearMarkers() {
for (var i = 0; i < markers.length; i++) {
  if (markers[i]) {
	markers[i].setMap(null);
	markers[i] == null;
  }
}
}

function setAutocompleteCountry() {
var country = document.getElementById('countryData').value;
if (country == 'all') {
  autocomplete.setComponentRestrictions([]);
  map.setCenter(new google.maps.LatLng(15,0));
  map.setZoom(2);
} else {
  autocomplete.setComponentRestrictions({ 'country': country });
  map.setCenter(countries[country].center);
  map.setZoom(countries[country].zoom);  
}
clearResults();
clearMarkers();	
}

function dropMarker(i) {
return function() {
  markers[i].setMap(map);
}
}

function addResult(result, i) {
var results = document.getElementById("results");
var markerLetter = String.fromCharCode("A".charCodeAt(0) + i);
var markerIcon = MARKER_PATH + markerLetter + ".png";

var tr = document.createElement('tr');
tr.onclick = function() {
  google.maps.event.trigger(markers[i], 'click');
};

var iconTd = document.createElement('td');
var nameTd = document.createElement('td');
var icon = document.createElement('img');
icon.src = markerIcon;
icon.setAttribute("class", "placeIcon");
icon.setAttribute("className", "placeIcon");
var name = document.createTextNode(result.name);
iconTd.appendChild(icon);
nameTd.appendChild(name);
tr.appendChild(iconTd);
tr.appendChild(nameTd);
results.appendChild(tr);
}

function clearResults() {
var results = document.getElementById("results");
while (results.childNodes[0]) {
  results.removeChild(results.childNodes[0]);
}
}

function getDetails(result, i) {
return function() {
  places.getDetails({
	  reference: result.reference
  }, showInfoWindow(i));
}
}

function showInfoWindow(i) {
return function(place, status) {
  if (iw) {
	iw.close();
	iw = null;
  }
  
  if (status == google.maps.places.PlacesServiceStatus.OK) {
	iw = new google.maps.InfoWindow({
	  content: getIWContent(place)
	});
	iw.open(map, markers[i]);        
  }
}
}

function getIWContent(place) {
var content = "";
content += '<table>';
content += '<tr class="iw_table_row">';
content += '<td style="text-align: right"><img class="hotelIcon" src="' + place.icon + '"/></td>';
content += '<td><b><a href="' + place.url + '">' + place.name + '</a></b></td></tr>';
content += '<tr class="iw_table_row"><td class="iw_attribute_name">Address:</td><td>' + place.vicinity + '</td></tr>';
if (place.formatted_phone_number) {
  content += '<tr class="iw_table_row"><td class="iw_attribute_name">Telephone:</td><td>' + place.formatted_phone_number + '</td></tr>';      
}
if (place.rating) {
  var ratingHtml = '';
  for (var i = 0; i < 5; i++) {
	if (place.rating < (i + 0.5)) {
	  ratingHtml += '&#10025;';
	} else {
	  ratingHtml += '&#10029;';
	}
  }
  content += '<tr class="iw_table_row"><td class="iw_attribute_name">Rating:</td><td><span id="rating">' + ratingHtml + '</span></td></tr>';
}
if (place.website) {
  var fullUrl = place.website;
  var website = hostnameRegexp.exec(place.website);
  if (website == null) { 
	website = 'http://' + place.website + '/';
	fullUrl = website;
  }
  content += '<tr class="iw_table_row"><td class="iw_attribute_name">Website:</td><td><a href="' + fullUrl + '">' + website + '</a></td></tr>';
}
content += '</table>';
return content;
}