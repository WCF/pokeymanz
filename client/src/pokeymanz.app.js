/*global L*/
(function ($) {
    "use strict";

    var speciesCount = 151,
        spritePath = '../static/sprites/',
        map = L.map('map');

    function getIcon(file, width, height) {
        var iconCfg = {
            iconUrl: file
        };
        if (width && height) {
            iconCfg.iconSize = [width, height];
        }

        return L.icon(iconCfg);
    }

    function addMarker(file, latlng, options) {
        options = options || {};
        var file = spritePath + file,
            lat = latlng[0],
            lng = latlng[1],
            img = new Image(),
            autoSize = options.autoSize || false,
            deferred = new $.Deferred();

        img.src = file;
        img.onload = function () {
            var myIcon, marker,
                currentZoom = map.getZoom(),
                factor = currentZoom * 0.02;
            if (autoSize) {
                myIcon = getIcon(file, this.width * factor, this.height * factor);
            } else {
                myIcon = getIcon(file, options.width, options.height);
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

        addMarker('red.png', [lat, lng]);
        addMarker('gym.png', [43.438683,-80.460562], {autoSize: true, popup: 'World Gym Kitchener'});
        addMarker('gym2.png', [43.4569133,-80.4891244], {autoSize: true, popup: 'LA Fitness Gym'});
        addMarker('gym3.png', [43.4540692,-80.5038234], {autoSize: true, popup: 'Aradia Fitness Gym'});

        for (var i = 1; i < speciesCount; i++) {
            addMarker('monsters/front/' + i + '.png', [43.45 + Math.random() - 0.5, -80.50 + Math.random() - 0.5], {width: 48, height: 48});
        }

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

}(window.jQuery));
