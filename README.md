# leaflet-challenge
## Module 15 Challenge
For this project I created a map using Leaflet and GeoJSON to plot earthquake data. View the code [here](Leaflet-Part-1).

## Creating Visualization
Using Leaflet I created a map that plots all the earthquakes from the dataset based on their longitude and latitude. The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by their color. 

![map of earthquakes](Images/map.png)

Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in color.

## Popups
Each marker has a popup that provides additional information about the earthquake when clicked on.

![information of earthquake](Images/updated_popup.png)

In this popup you can see where the earthquake took place, the time it took place, as well as the earthquake's magnitude and depth. 

## Legend
A legend is displayed at the bottom right corner of the map to indicate the different depths of the earthquakes and which colors are representing them. 

![map legend](Images/legend.png)

## References
Dataset created by the [United States Geological Survey](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

Earthquake dataset used can be found [here](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson).