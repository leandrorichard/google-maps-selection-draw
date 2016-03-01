var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.518, lng: 13.404},
        zoom: 12
    });

    var drawingManager = new google.maps.drawing.DrawingManager({
	    drawingMode: google.maps.drawing.OverlayType.POLYGON,
	    drawingControl: true,
	    drawingControlOptions: {
	      	position: google.maps.ControlPosition.TOP_CENTER,
	      	drawingModes: [
		        google.maps.drawing.OverlayType.POLYGON
		    ]
	    },
	    polygonOptions: {
			fillColor: 'rgba(3, 169, 244, 0.29)',
			fillOpacity: 1,
			strokeWeight: 5,
			clickable: false,
			editable: true,
			zIndex: 1
	    }
  	});

    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
    	var paths = polygon.getPath();

    	paths.forEach(function (element, index) {
    		console.log('Lat: ' + element.lat() + ' - Lng: ' + element.lng());
    	});

    	addMarker();
    });
    
}

function addMarker() {
	var markers = [
		{'lat': 52.530, 'lng': 13.373},
		{'lat': 52.534, 'lng': 13.455},
		{'lat': 52.502, 'lng': 13.432},
		{'lat': 52.502, 'lng': 13.391},
		{'lat': 52.490, 'lng': 13.430},
		{'lat': 52.535, 'lng': 13.414}
	];

	for (var i = markers.length - 1; i >= 0; i--) {
		marker = new google.maps.Marker({
		    map: map,
		    draggable: true,
		    animation: google.maps.Animation.DROP,
		    position: {lat: markers[i].lat, lng: markers[i].lng}
	  	});
	  	marker.addListener('click', toggleBounce);
	};
	
}

function toggleBounce() {
  	if (marker.getAnimation() !== null) {
    	marker.setAnimation(null);
  	} else {
    	marker.setAnimation(google.maps.Animation.BOUNCE);
  	}
}