// hard coded :'(

var line_ice, line_tram_66, animated_ice, animated_tram
var markers

function init_station()
{
      // ICE 42
      var mannheim_hbf = [49.4794029, 8.4696395] ;
      var frankfurt_airport = [50.0528897, 8.5695944] ;
      var cologne_hbf = [50.9427684, 6.9590464] ;
      var dusseldorf_hbf = [51.2195845, 6.7949628] ; 
      var siegburg = [50.671195, 7.429848] ;
      var before_siegburg = [50.692731, 7.390022] ;
      var bonn_hbf = [50.7320436, 7.0967647] ;

      // Tram 66 
      var siegburg = [50.7929167, 7.2029256]; 
      var hangelar_ost = [50.7637489, 7.1717841] ; 
      var sankt_augustin = [50.7768318, 7.1880754] ;



    mannheim_marker = L.marker(mannheim_hbf, {icon:icon_train_station}).addTo(map)
    .bindPopup("Mannheim Hbf");

    frankfurt_marker = L.marker(frankfurt_airport, {icon:icon_train_station}).addTo(map)
    .bindPopup(`<h1>Frankfurt Flughafen Bahnhof</h1> 
                Homepage: <a href="https://www.bahnhof.de/bahnhof-de/Frankfurt_am_Main_Flughafen_Fernbahnhof-1039350">Frankfurt am Main Flughafen Fernbahnhof</a> <br>
                Mobiler Service: <b>06:00 - 22:30</b> <br> 
                ...
                  `);

    cologne_marker = L.marker(cologne_hbf, {icon:icon_train_station}).addTo(map)
    .bindPopup("<h1>Köln Hbf</h1>");

    dusseldorf_marker = L.marker(dusseldorf_hbf, {icon:icon_train_station}).addTo(map)
    .bindPopup("<h1>Düsseldorf Hbf<h1>");

    siegburg_marker = L.marker(siegburg, {icon:icon_train_station}).addTo(map)
    .bindPopup(`<h1>Siegburg Bahnhof</h1> 
                Homepage: <a href="https://www.bahnhof.de/bahnhof-de/Siegburg-Bonn-1038514">Siegburg Hbf</a> <br>
                Mobiler Service: <b>08:00 - 20:00</b> <br> 
                ...
                <br> 
                    <button type="button" onclick="executeLgdQuery();">Suche Kneipen!</button> 
                  `);
    hangelar_ost_marker = L.marker(hangelar_ost, {icon:icon_tram_station}).addTo(map)
    .bindPopup("<h1>Hangelar Ost</h1>");

    bonn_marker = L.marker(bonn_hbf, {icon:icon_tram_station}).addTo(map)
    .bindPopup("<h1>Bonn Hbf</h1>");
  
    sankt_augustin_marker = L.marker(sankt_augustin, {icon:icon_tram_station}).addTo(map)
    .bindPopup("<h1>Sankt Augustin</h1>");

  line_ice = L.polyline([before_siegburg, before_siegburg, siegburg]);
  line_tram_66_to_siegburg = L.polyline([hangelar_ost, hangelar_ost, sankt_augustin, siegburg]);
  line_tram_66_from_siegburg = L.polyline([siegburg, siegburg, sankt_augustin, hangelar_ost]);
  
  /*line_bonn = L.polyline([
[50.7942173,7.2060013],
[50.7892256,7.2022247],
[50.7846676,7.1957016],
[50.7801091,7.1915817],
[50.7751159,7.1871185],
[50.7694708,7.1809387],
[50.7659966,7.1764755],
[50.759916,7.1740723],
[50.7566583,7.1678925],
[50.7536175,7.1603394],
[50.752097,7.1490097],
[50.7514454,7.1400833],
[50.7503593,7.1315002],
[50.7471009,7.1253204],
[50.743625,7.1225739],
[50.7410179,7.1191406],
[50.7388452,7.1146774],
[50.7375415,7.1057510],
[50.7366724,7.0957947],
[50.7336303,7.0951080],
[50.7375415,7.0954514],
[50.7375415,7.1019745],
[50.7377588,7.1112442],
[50.739497,7.1181107],
[50.7425387,7.1236038],
[50.7471009,7.1270370],
[50.7492732,7.1328735],
[50.7501421,7.1397400],
[50.7512282,7.1507263],
[50.7516626,7.1579361],
[50.7542691,7.1644592],
[50.757527,7.1696091],
[50.7610019,7.1764755],
[50.7659966,7.1775055],
[50.7701222,7.1819687],
[50.773379,7.1867752],
[50.7785895,7.1895218],
[50.7818457,7.1953583],
[50.7855358,7.1981049],
[50.7881404,7.2029114],
[50.7922641,7.2060013],
[50.7963874,7.2053146] ]);
     
     */

  animated_ice = L.animatedMarker(line_ice.getLatLngs(), {
    icon: icon_ice,
    distance: 1000,  // meters
    interval: 500, // milliseconds

  });

  animated_tram = L.animatedMarker(line_tram_66_to_siegburg.getLatLngs(), {
    icon: icon_tram,
    distance: 500,  // meters
    interval: 1000, // milliseconds

  });

/*
animated_tram_from_bonn = L.animatedMarker(line_bonn.getLatLngs(), {
    icon: icon_tram,
    distance: 500,  // meters
    interval: 1000, // milliseconds
  });

*/

  animated_tram_from_siegburg = L.animatedMarker(line_tram_66_from_siegburg.getLatLngs(), {
    icon: icon_tram,
    distance: 500,  // meters
    interval: 1000, // milliseconds
    onEnd: function() {
       atom_bomb_marker = L.marker(hangelar_ost, {icon:atom_bomb}).addTo(map)
  }});


    var route_ice = L.featureGroup([
      mannheim_marker,
      L.polyline([mannheim_hbf, frankfurt_airport]),
      frankfurt_marker,
      L.polyline([frankfurt_airport, siegburg]),
      siegburg_marker,
      L.polyline([siegburg, cologne_hbf]),
      cologne_marker,
      L.polyline([cologne_hbf, dusseldorf_hbf]),

    ]);

  var route_tram = L.featureGroup([
      hangelar_ost_marker,
      L.polyline([hangelar_ost, sankt_augustin]),
      sankt_augustin_marker,
      L.polyline([sankt_augustin, siegburg]),
      siegburg_marker,
    ]);

/*

  var route_bonn = L.featureGroup([
      bonn_marker,
      L.polyline([
[50.7942173,7.2060013],
[50.7892256,7.2022247],
[50.7846676,7.1957016],
[50.7801091,7.1915817],
[50.7751159,7.1871185],
[50.7694708,7.1809387],
[50.7659966,7.1764755],
[50.759916,7.1740723],
[50.7566583,7.1678925],
[50.7536175,7.1603394],
[50.752097,7.1490097],
[50.7514454,7.1400833],
[50.7503593,7.1315002],
[50.7471009,7.1253204],
[50.743625,7.1225739],
[50.7410179,7.1191406],
[50.7388452,7.1146774],
[50.7375415,7.1057510],
[50.7366724,7.0957947],
[50.7336303,7.0951080],
[50.7375415,7.0954514],
[50.7375415,7.1019745],
[50.7377588,7.1112442],
[50.739497,7.1181107],
[50.7425387,7.1236038],
[50.7471009,7.1270370],
[50.7492732,7.1328735],
[50.7501421,7.1397400],
[50.7512282,7.1507263],
[50.7516626,7.1579361],
[50.7542691,7.1644592],
[50.757527,7.1696091],
[50.7610019,7.1764755],
[50.7659966,7.1775055],
[50.7701222,7.1819687],
[50.773379,7.1867752],
[50.7785895,7.1895218],
[50.7818457,7.1953583],
[50.7855358,7.1981049],
[50.7881404,7.2029114],
[50.7922641,7.2060013],
[50.7963874,7.2053146]
        ]),
      siegburg_marker,
    ]);
    */

  //map.fitBounds(route.getBounds());


    map.addLayer(route_ice);
    map.addLayer(route_tram);
   // map.addLayer(route_bonn);
}


function start_ice()
{ 
   map.addLayer(animated_ice);
   animated_ice.start();
}

function start_tram_bonn()
{ 
   map.addLayer(animated_tram_from_bonn);
   animated_tram_from_bonn.start();
}


function start_tram_to_siegburg()
{ 
   map.addLayer(animated_tram);
   animated_tram.start();
}



function start_tram_from_siegburg()
{ 
   map.addLayer(animated_tram_from_siegburg);
   animated_tram_from_siegburg.start()
}


    //snake()

/*
  for (var i = 0, latlngs = [], len = route.length; i < len; i++) {
        latlngs.push(new L.LatLng(route[i][0], route[i][1]));
      }
      var path = L.polyline(latlngs);
      map.fitBounds(L.latLngBounds(latlngs));
      map.addLayer(L.marker(latlngs[0]));
      map.addLayer(L.marker(latlngs[len - 1]));
      map.addLayer(path);
      path.bindPopup("Hello world");
      function snake() {
        path.snakeIn();
      }
      path.on('snakestart snake snakeend', function(ev){
        console.log(ev.type);
      });
    */


function httpGetAsync(requestUrl, processData)
{
    console.log("http get async")
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            console.log("http get asyne - on ready exchange")
            processData(xhr.responseText);
        }
    }

    xhr.open("GET", requestUrl, true); // true for asynchronous 
    xhr.send(null);
}


function httpGetAsync(requestUrl, processData)
{
    console.log("http get async")
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            console.log("http get asyne - on ready exchange")
            processData(xhr.responseText);
        }
    }

    xhr.open("GET", requestUrl, true); // true for asynchronous 
    xhr.send(null);
}




function processData(results)
{
  console.log("process Data")

   console.log(results)



   // parse eto JSON 
    var jsonResult = JSON.parse(results, null, 2);
    
    // get results array  
    instanceList = jsonResult.results.bindings

    console.log(instanceList)

    // draw each result item to the map 
    for (let instance of instanceList)
    {
      //console.log(instance.name.value)

      drawToMap(instance.name.value, instance.geo.value)
    }

}


// Linked Geo Data Query Execution 
function executeLgdQuery() 
{
  // read query from HTML Text area
  lgd_query = lgd_default_query

  // construct http get request 
  full_query = lgd_graph_uri + encodeURIComponent(lgd_query) + lgd_result_format 
  
  // execute request 
  httpGetAsync(full_query, processData)
}



// Linked Geo Data Query Execution
function executeDbPediaQuery() 
{
  // read query from HTML Text area
  dbpedia_query = dbpedia_editor.getValue()

  // construct http get request 
  full_query = dbpedia_graph_uri + encodeURIComponent(dbpedia_query) + dbpedia_result_format 
  
  // execute request 
  httpGetAsync(full_query, processData)
}


function processData(results)
{
  console.log("process Data")

   console.log(results)



   // parse eto JSON 
    var jsonResult = JSON.parse(results, null, 2);
    
    // get results array  
    instanceList = jsonResult.results.bindings

    console.log(instanceList)

    // draw each result item to the map 
    for (let instance of instanceList)
    {
      //console.log(instance.name.value)

      drawToMap(instance.name.value, instance.geo.value)
    }

}



function drawToMap(instanceName, instanceGeo) {

  // console.log(instanceGeo)

  // "POINT(7.1830067 50.8969143)"
  var regex_result = instanceGeo.match("\\s.*");

  delimiter = regex_result.index

  lat = instanceGeo.substring(6, delimiter)
  long = instanceGeo.substring(delimiter+1)
  long = long.slice(0, long.length-1)


  console.log(lat)
  console.log(long)
  console.log(instanceName)

  new_marker = L.marker([long, lat], {icon:beerIcon}).addTo(map)
    .bindPopup(instanceName)
    .openPopup();

  // add marker
   markers.addLayer(new_marker);
}






// Definition of Markers on the map 

var markerIcon = L.icon({
    iconUrl: 'img/marker-icon.png',
    iconSize: [20, 20], 
});


var beerIcon = L.icon({
    iconUrl: 'img/beer.png',
    iconSize: [20, 20], 
});

var icon_train_station = L.icon({
    iconUrl: 'img/train_station.png',
    iconSize: [20, 20], 
});



var atom_bomb = L.icon({
    iconUrl: 'https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif',
    iconSize: [200, 200], 
});


var icon_tram_station = L.icon({
    iconUrl: 'img/tram_stop.png',
    iconSize: [20, 20], 
});

var icon_tram = L.icon({
    iconUrl: 'img/tram.png',
    iconSize: [20, 20], 
});

var icon_ice = L.icon({
    iconUrl: 'img/007-ice-train.svg',
    iconSize: [20, 20], 
});


var markerIconRed = L.icon({
    iconUrl: 'img/marker-icon-red.png',
    iconSize: [20, 20], 
});

var markerIconViolet = L.icon({
    iconUrl: 'img/marker-icon-violet.png',
    iconSize: [20, 20], 
});

var busIcon = L.icon({
    iconUrl: 'img/bus.png',
    iconSize: [20, 20], 
});



// DO NOT CHANGE ------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
var popup = L.popup();

function onMapClick(e) {
    popup
  .setLatLng(e.latlng)
  .setContent("You clicked the map at " + e.latlng.toString())
  .openOn(map);
}

map = L.map('map').setView([50.7674, 7.2156], 12);

var markers = L.featureGroup();
map.addLayer(markers)

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'klang.ng9i3eh6',
    accessToken: 'pk.eyJ1Ijoia2xhbmciLCJhIjoiY2llc2d1ZzBjMDAwMDlqa3N5amM0emxmeCJ9.-IYjn89ohocerNpQDPbpMw'
}).addTo(map);










// LinkedGeoData global variables ------------------
lgd_graph_uri = "http://linkedgeodata.org/sparql?default-graph-uri=http%3A%2F%2Flinkedgeodata.org&query="
lgd_default_query = 
`PREFIX lgd: <http://linkedgeodata.org/ontology/>
PREFIX geom: <http://geovocab.org/geometry#>
PREFIX ogc: <http://www.opengis.net/ont/geosparql#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>

SELECT ?name, ?geo 
{
    ?bonn owl:sameAs <http://dbpedia.org/resource/Siegburg> .
    ?bonn geom:geometry [ ogc:asWKT ?bonnGeo] .

    ?bar a lgd:Bar .
    ?bar rdfs:label ?name .    
    ?bar geom:geometry [ ogc:asWKT ?geo] .

    FILTER(bif:st_intersects (?bonnGeo, ?geo, 1)) .

} LIMIT 10`
lgd_result_format = "&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on"

// DBPedia global variables ----------------------
dbpedia_graph_uri = "http://dbpedia.org/sparql?default-graph-uri=http://dbpedia.org&query="
dbpedia_default_query = `PREFIX geom: <http://geovocab.org/geometry#>
PREFIX ogc:  <http://www.opengis.net/ont/geosparql#>
PREFIX owl:  <http://www.w3.org/2002/07/owl#>
PREFIX dbo:  <http://dbpedia.org/ontology/>
PREFIX dbr:  <http://dbpedia.org/resource/> 

SELECT *
{
    ?location dbo:location dbr:London .
    ?location rdfs:label ?name .
    OPTIONAL {?location geo:geometry ?geo . }

} LIMIT 10`
dbpedia_result_format = "&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=30000&debug=on&run=+Run+Query+"

var lgd_editor
var dbpedia_editor 
var map

map.on('click', onMapClick);



function init() {

  init_station()
    

    lgd_query = lgd_default_query


    dbpedia_query = lgd_default_query
}

function clearMap() {
    markers.clearLayers();
}

     
