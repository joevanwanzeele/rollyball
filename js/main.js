
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

    onSuccess: function(acceleration) {
        var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
        'Acceleration Y: ' + acceleration.y         + '<br />' +
        'Acceleration Z: ' + acceleration.z         + '<br />' +
        'Timestamp: '      + acceleration.timestamp + '<br />';
    },

    onError: function(){
        alert("something went wrong");
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var options = { frequency: 10 };
        var watchID = navigator.accelerometer.watchAcceleration(app.onSuccess, app.onError, options);
    }
};
