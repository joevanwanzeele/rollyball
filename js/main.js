function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    return result;
}

var startingCompassPosition;

var app = {

    // Application Constructor
    initialize: function() {
//        var canvas = document.getElementById("mainCanvas");
//        canvas.width = document.body.clientWidth; //document.width is obsolete
//        canvas.height = document.body.clientHeight; //document.height is obsolete
//
//        if( canvas.getContext )
//        {
//            setInterval( this.run , 33 );
//        }
//        this.ball = new Ball(canvas);

        this.bindEvents();
    },

    run: function(){
        this.ball.draw();
        this.ball.move();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'

    accelerometerSuccess: function(acceleration) {
        var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
        'Acceleration Y: ' + acceleration.y         + '<br />' +
        'Acceleration Z: ' + acceleration.z         + '<br />' +
        'Timestamp: '      + acceleration.timestamp + '<br />';
    },

    compassSuccess: function(compass){
        var heading = roundNumber(compass.magneticHeading);
        if (!startingCompassPosition)
        {
            startingCompassPosition = heading;
        }
        document.getElementById('compassHeading').innerHTML = heading;
    },

    tilt: function(orientation){
        document.getElementById('gyroscopeReading').innerHTML = orientation[0] + " : " + orientation[1];
    },

    error: function(e){
        alert("something went wrong: " + e);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function () {
                app.tilt([event.beta, event.gamma]);
            }, true);
        } else if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', function () {
                app.tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
            }, true);
        } else {
            window.addEventListener("MozOrientation", function () {
                app.tilt([orientation.x * 50, orientation.y * 50]);
            }, true);
        }
        var options = { frequency: 40 };
        var watchID = navigator.accelerometer.watchAcceleration(app.accelerometerSuccess, app.error, options);
        var watchCompassId = navigator.compass.watchHeading(app.compassSuccess, app.error, options);
    }
};
