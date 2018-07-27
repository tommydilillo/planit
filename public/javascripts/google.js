// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// < src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {
  window.map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 25.761, lng: -80.1917 },
    zoom: 5
  });
  var map = window.map;
  var card = document.getElementById("pac-card");
  var input = document.getElementById("pac-input");
  var types = document.getElementById("type-selector");
  var strictBounds = document.getElementById("strict-bounds-selector");

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  var autocomplete = new google.maps.places.Autocomplete(input);

  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(["address_components", "geometry", "icon", "name"]);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById("infowindow-content");
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener("place_changed", function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    //GETS LATITUDE AND LONGITUDE FROM AUTOCOMPLETE
    console.log("TEST", place);
    let latitude = place.geometry.location.lat();
    let longitude = place.geometry.location.lng();
    console.log("latitude: ", latitude);
    console.log("longitude: ", longitude);
    //Updates hidden form value to latitude and longitude
    document.getElementById("lat").setAttribute("value", latitude);
    document.getElementById("lng").setAttribute("value", longitude);

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
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          ""
      ].join(" ");
    }

    infowindowContent.children["place-icon"].src = place.icon;
    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent = address;
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    // radioButton.addEventListener("click", function() {
    //   autocomplete.setTypes(types);
    // });
  }

  setupClickListener("changetype-all", []);
  setupClickListener("changetype-address", ["address"]);
  setupClickListener("changetype-establishment", ["establishment"]);
  setupClickListener("changetype-geocode", ["geocode"]);

  document.getElementById("use-strict-bounds");
  // .addEventListener("click", function() {
  //   console.log("Checkbox clicked! New state=" + this.checked);
  //   autocomplete.setOptions({ strictBounds: this.checked });
  // });
}
// ------------------------

//AXIOS LIST INFO FOR list-detail PAGE

window.onload = () => {
  var listId = document.getElementById("listName").getAttribute("data-id");
  var url = `http://localhost:3000/lists/ajax/${listId}`;
  console.log("listID:", listId); //WORKING:listId shows up.
  axios
    .get(url)
    .then(response => {
      const list = response.data;
      console.log("list", response.data);
      const position = {
        lat: list.lat,
        lng: list.lng
      };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: position
      });

      const marker = new google.maps.Marker({
        position: position,
        map: map,
        name: list.name
      });
      console.log(marker);
      console.log("title", marker.name);
    })
    .catch(error => {
      console.log(error);
    });
};

//AJAX FOR MY LISTS PAGE

window.onload = () => {
  // var listId = document.getElementById("listName").getAttribute("data-id");
  // console.log("listID:", listId); //WORKING:listId shows up.

  var url = `http://localhost:3000/lists/ajax`;
  axios
    .get(url)
    .then(response => {
      const lists = response.data;
      console.log("list", response.data);
      const position = {
        lat: lists.lat,
        lng: lists.lng
      };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: position
      });

      const marker = new google.maps.Marker({
        position: position,
        map: map,
        name: list.name
      });
      console.log(marker);
      console.log("title", marker.name);
    })
    .catch(error => {
      console.log(error);
    });
};

// / ADDING MARKERS

// const markers = [];
// // console.log(lists);

// function listPlaces(lists) {
//   lists.forEach(lists => {
//     const center = {
//       lat: lat,
//       lng: lng
//     };
//     const pin = new google.maps.Marker({
//       position: center,
//       map: map,
//       title: lists.name,
//       anchorPoint: new google.maps.Point(0, -29)
//     });
//     markers.push(pin);
//   });
// }

// console.log(markers);
