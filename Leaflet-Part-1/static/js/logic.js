// Store our API endpoint as queryUrl
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    createFeatures(data.features);
});

// Create a function that will calculate marker size based on magnitude
function markerSize(magnitude) {
  return magnitude * 10;
}

// Create a function that will determine marker color based on depth
function markerColor(depth) {
  let color = "";
  if (depth >= -10 && depth <= 10) {
    color = "green";
  }
  else if(depth > 10 && depth <= 30) {
    color = "lightgreen";
  }
  else if(depth > 30 && depth <= 50) {
    color = "yellow";
  }
  else if(depth > 50 && depth <= 70) {
    color = "orange";
  }
  else if(depth > 70 && depth <= 90) {
    color = "darkorange";
  }
  else if (depth >= 90) {
    color = "red";
  }
  else {
    color = "blue";
  }
}

function createFeatures(earthquakeData) {
  // Give each feature a pop up that describes the place, magnitude, and depth of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.mag}</h3><hr><p>${feature.properties.place}</p>`);
  }

  // Add circles to map based on earthquake locations
  L.circle(geometry.coordinates[0],geometry.coordinates[1], {
    fillOpacity: 0.75,
    color: "black",
    fillColor: markerColor(geometry.coordinates[2]),
    radius: markerSize(properties.mag)
  });

  // Create the geoJSON layer
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send earthquake layer to createMap function
  createImageBitmap(earthquakes);
}

function createMap(earthquakes) {

  // Create the tile layer
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // Create the overlay object to hold our overlay
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create the map
  let myMap = L.map("map", {
    center: [37.09, -95.71  ],
    zoom: 5
    layers: [street, earthquakes]
  });

  // Create a layer control
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

//   // Set up the legend
//   let legend = L.control({position: "bottomright"});
//   legend.onAdd = function() {
//   let div = L.DomUtil.create("div", "info legend");
//   let limits = geojson.options.limits

// }

}
