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
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p></h3><hr><p>Magnitude: ${feature.properties.mag}</p>"`);
    }
    // Save the earthquake data in a variable.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        
        var markers = {
          radius: markerSize(8*feature.properties.mag),
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
  
    // Create a baseMaps object.
    // var baseMaps = {
    //   "Street Map": street,
    //   "Topographic Map": topo
    // };
  
    // Creat an overlays object.
    // var overlayMaps = {
    //   Earthquakes: earthquakes
    // }
  
    // Create a new map.
    // Edit the code to add the earthquake data to the layers.
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [street, earthquakes]
    });
  
    // Create a layer control that contains our baseMaps.
    // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
    // L.control.layers(baseMaps, overlayMaps, {
    //   collapsed: false
    // }).addTo(myMap);
    
    // function getColor(d) {
    //     return d < 1 ? 'rgb(255,255,255)' :
    //           d < 2  ? 'rgb(255,225,225)' :
    //           d < 3  ? 'rgb(255,195,195)' :
    //           d < 4  ? 'rgb(255,165,165)' :
    //           d < 5  ? 'rgb(255,135,135)' :
    //           d < 6  ? 'rgb(255,105,105)' :
    //           d < 7  ? 'rgb(255,75,75)' :
    //           d < 8  ? 'rgb(255,45,45)' :
    //           d < 9  ? 'rgb(255,15,15)' :
    //                       'rgb(255,0,0)';
    // }
  
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

  
