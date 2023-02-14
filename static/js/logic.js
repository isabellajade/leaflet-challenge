    // Use this link to get the GeoJSON data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Perform a GET request to the query URL.
d3.json(link).then(function (data) {
    console.log(data.features);
    // Using the features array sent back in the API data, create a GeoJSON layer, and add it to the map.
    // 1.
    // Pass the features to a createFeatures() function:
    createFeatures(data.features);
  });

  // Function to determine marker size
function markerSize(magnitude) {
    return magnitude * 2000;
  };
  
// Function to determine marker color by depth
function chooseColor(depth){
    if (depth < 10) return "#00FF00";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "orangered";
    else return "#FF0000";
  }

  // 2. 
  function createFeatures(earthquakeData) {
  
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p></h3><hr><p>Magnitude: ${feature.properties.mag}</p>`);
    }
    // Save the earthquake data in a variable.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        
        var markers = {
          radius: markerSize(7*feature.properties.mag),
          fillColor: chooseColor(feature.geometry.coordinates[2]),
          color: "black",
          weight: 1,
          opacity: 1,
          stroke: true,
          fillOpacity: 0.8
        };
        return L.circle(latlng, markers);
      }
    });
    // Pass the earthquake data to a createMap() function.
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
  
    // Create a new map.
    // Edit the code to add the earthquake data to the layers.
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [street, earthquakes]
    });
  
    // Create a legend to display information about our map
    var legend = L.control({position: 'bottomright'});
  
    legend.onAdd = function () {
    
        var div = L.DomUtil.create('div', 'info legend'),
        depth = [-10, 10, 30, 50, 70, 90];
  
        div.innerHTML+='Depth<br><hr>'
    
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < depth.length; i++) {
            div.innerHTML +=
            '<i style="background:' + chooseColor(depth[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }
    
    return div;
    };
    
    legend.addTo(myMap);
  };

  
