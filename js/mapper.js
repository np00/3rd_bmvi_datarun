// hard coded :'(

var line_ice, line_tram_66, animated_ice, animated_tram


function init_station()
{
      // ICE 42
      var mannheim_hbf = [49.4794029, 8.4696395] ;
      var frankfurt_airport = [50.0528897, 8.5695944] ;
      var cologne_hbf = [50.9427684, 6.9590464] ;
      var dusseldorf_hbf = [51.2195845, 6.7949628] ; 
      var siegburg = [50.671195, 7.429848] ;
      var before_siegburg = [50.692731, 7.390022] ;

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
                 <button type="button">Zeige Restaurants!</button> 
                  `);
    hangelar_ost_marker = L.marker(hangelar_ost, {icon:icon_tram_station}).addTo(map)
    .bindPopup("<h1>Hangelar Ost</h1>");
  
    sankt_augustin_marker = L.marker(sankt_augustin, {icon:icon_tram_station}).addTo(map)
    .bindPopup("<h1>Sankt Augustin</h1>");

  line_ice = L.polyline([before_siegburg, before_siegburg, siegburg]);
  line_tram_66_to_siegburg = L.polyline([hangelar_ost, hangelar_ost, sankt_augustin, siegburg]);
  line_tram_66_from_siegburg = L.polyline([siegburg, siegburg, sankt_augustin, hangelar_ost]);
     

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

  animated_tram_from_siegburg = L.animatedMarker(line_tram_66_from_siegburg.getLatLngs(), {
    icon: icon_tram,
    distance: 500,  // meters
    interval: 1000, // milliseconds

  });

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


  //map.fitBounds(route.getBounds());


    map.addLayer(route_ice);
    map.addLayer(route_tram);

    function snake() {
      route.snakeIn();
    }

    route.on('snakestart snake snakeend', function(ev){
      console.log(ev.type);
    });
}


function start_ice()
{ 
   map.addLayer(animated_ice);
   animated_ice.start();
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
  // construct http get request 
  full_query = encodeURIComponent(query_city_bonn)
  
  // execute request 
  httpGetAsync(full_query, processData)
}


// Linked Geo Data Query Execution 
function executeLgdQuery() 
{
  // read query from HTML Text area
  lgd_query = lgd_editor.getValue()

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


  new_marker = L.marker([long, lat], {icon:markerIconRed}).addTo(map)
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

var icon_train_station = L.icon({
    iconUrl: 'img/train_station.png',
    iconSize: [20, 20], 
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
    ?bonn owl:sameAs <http://dbpedia.org/resource/Bonn> .
    ?bonn geom:geometry [ ogc:asWKT ?bonnGeo] .

    ?bar a lgd:Bar .
    ?bar rdfs:label ?name .    
    ?bar geom:geometry [ ogc:asWKT ?geo] .

    FILTER(bif:st_intersects (?bonnGeo, ?geo, 5)) .

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

     
