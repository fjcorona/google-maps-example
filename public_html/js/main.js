$(document).ready( function() {
    $.getJSON("json/maps.json", function (locations) {
        mapsPerformance.loadMap(locations, "maps", "Custom maps", false);
    });
});