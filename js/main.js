
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
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.startWatch();
    },

    startWatch: function() {
    // Update acceleration every 3 seconds
    var options = { frequency: 500 };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    },

    onSuccess: function(acceleration) {
        var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
        'Acceleration Y: ' + acceleration.y         + '<br />' +
        'Acceleration Z: ' + acceleration.z         + '<br />' +
        'Timestamp: '      + acceleration.timestamp + '<br />';
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
