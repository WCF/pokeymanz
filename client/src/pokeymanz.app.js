/*global L*/
(function ($, map) {
    "use strict";

    function getIcon(file, width, height) {
        var currentZoom = map.getZoom(),
            factor = currentZoom * 0.02;
        var iconCfg = {
            iconUrl: file
        };
        if (width && height) {
            iconCfg.iconSize = [width * factor, height * factor];
        }

        return L.icon(iconCfg);
    }

    function addMarker(file, latlng, options) {
        options = options || {};
        var lat = latlng[0],
            lng = latlng[1],
            img = new Image(),
            autoSize = options.autoSize || false,
            deferred = new $.Deferred();

        img.src = file;
        img.onload = function () {
            var myIcon, marker;
            if (autoSize) {
                myIcon = getIcon(file, this.width, this.height);
            } else {
                myIcon = getIcon(file);
            }

            marker = L.marker([lat, lng], {icon: myIcon, riseOnHover: true});
            marker.addTo(map);

            if (options.click) {
                marker.on('click', options.click);
            }
            if (options.popup) {
                marker.bindPopup(options.popup);
            }

            map.on('zoomend', function () {
                marker.setIcon(getIcon(file, this.width, this.height));
            });

            deferred.resolve(marker);
        };

        return deferred;
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;

        map.setView([lat, lng], 16);

        addMarker('red.png', [43.4534, -80.49783]);
        addMarker('gym.png', [lat, lng], {autoSize: true, popup: 'Cerulean Gym'});

    }, function () {  // error
        map.setView([43.470985487887056, -80.54265975952148], 12);
    });

    map.on('click', function (e) {
        console.debug(e.latlng);
    });

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 18,
        attribution: 'OSM',
        id: 'examples.map-i875mjb7'
    }).addTo(map);

}(window.jQuery, L.map('map')));
