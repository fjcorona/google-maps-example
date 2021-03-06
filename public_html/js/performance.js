/* ------------------------------------------------------ *\
    [Methods] Performance Map
\* ------------------------------------------------------ */
var mapsPerformance = {
    cleanLocations: function (locations) {
        var locationsClean;
        locationsClean = new Object();
        locationsClean = [];
        locationsClean = FNC.withoutArrayObjOR(locations, {
            "latitud": "", 
            "longitud": ""
        });
        locationsClean = FNC.withoutArrayObjOR(locationsClean, {
            "latitud": "0", 
            "longitud": "0"
        });
        locationsClean = FNC.withoutArrayObjOR(locationsClean, {
            "latitud": 0, 
            "longitud": 0
        });
        return locationsClean;
    },
    infoWindowGeneretor(location) {
        var info =
            "<div>" + 
                "<h2>" + location.place + "</h2>" +
                "<img src='"+ location.picture + "'><br><br>" +
                "<span>" + location.address + "</span>" +
                "<br><br>" +
                "<a href='" + location.link + "'>Go to google maps</a><br>" +
             "</di>";
        return info;
    },
    loadMap: function(locations, areaRender, title, active) {
        locations = mapsPerformance.cleanLocations(locations);
        active = (active === true) ? true : false;
        var options, map, markers, bounds, infoWindows;
        // Reset Area Render
        $("#" + areaRender).html("");
        $("#" + areaRender).removeAttr("style");
        $("#" + areaRender).css("height", "55px");;
        // Init Arrays
        markers = new Array();
        infoWindows = new Array();
        bounds = new google.maps.LatLngBounds();
        // If there are maps
        if(locations.length) {
            $("#" + areaRender).css("height", "700px");
            // Make Options
            options = {
                center: new google.maps.LatLng(
                    FNC.avgArrayObjByKey(locations, "latitud"),
                    FNC.avgArrayObjByKey(locations, "longitud")
                ),
                zoom: 12,
                scrollwheel: true,
                mapTypeControlOptions: {
                    mapTypeIds: [
                        google.maps.MapTypeId.ROADMAP, 
                        "map_style"
                    ]
                }
            }
            // Generate Map with options
            map = new google.maps.Map(
                document.getElementById(areaRender), 
                options
            );

            // Properties Array
            for(var idx = 0; idx < locations.length; idx++) {
                // marcador en el centro del mapa
                markers[idx] = new google.maps.Marker({
                    position: new google.maps.LatLng(
                        locations[idx].latitud, 
                        locations[idx].longitud
                    ),
                    map: map,
                    icon: "img/custom_pin.png",
                    // title: title,
                    title: locations[idx].place,
                    animation: google.maps.Animation.DROP
                });
                bounds.extend(markers[idx].getPosition());
                infoWindows[idx] = new google.maps.InfoWindow({
                    // content: FNC.getTemplate(temps["map_infobox"], locations[idx])
                    content: mapsPerformance.infoWindowGeneretor(locations[idx])
                });
                attachInfoWindowToMarker(map, markers[idx], infoWindows[idx], active);
            }
            //
            map.fitBounds(bounds);
        } else {
            $("#" + areaRender).html("<div>Locations not found</div>");
        }
        // function to attach infowindow with marker
        function attachInfoWindowToMarker(map, marker, infoWindow, active) {
            if(active) {
                infoWindow.open(map, marker);
            }
            google.maps.event.addListener(marker, "click", function() {
                infoWindow.open(map, marker);
            });
        }
    }
}