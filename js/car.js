$.getScript("js/paper.js");
paper.install(window);

// Variables del auto
var auto;
var autoAngulo0;
var autoPosicion0;
var chasis;
var cabina;
var llantaDI;
var llantaDD;
var llantaTI;
var llantaTD;
var luzDI;
var luzDD;
var sirena;
var basesirena;
var autoLayer;
var autoVelocidad;
var autoAngulo;

window.onload = function () {
    paper.setup('myCanvas');
    var tool = new Tool();

    bgLayer = new Layer();
    autoLayer = new Layer();
    jugar()
    tool.onKeyDown = function (event) {
        if (auto == null) {
            return;
        };
        event.preventDefault();
        // Se aumenta la velocidad
        if (event.key == 'up') {
    
            autoVelocidad += 5;
            autoVelocidad = Math.min(autoVelocidad + 5, 15);
        };
        // Se disminuye la velocidad
        if (event.key == 'down') {
            autoVelocidad = Math.max(autoVelocidad - 2.5, -15);
        };
        // Se gira el auto a la izquierda
        if (event.key == 'left') {
            autoAngulo = autoAngulo - (Math.PI / 180) * 5;
            auto.rotate(-5);
        };
        // Se gira el auto a la derecha
        if (event.key == 'right') {
            autoAngulo = autoAngulo + (Math.PI / 180) * 5;
            auto.rotate(5);
        };
    };

    view.onFrame = function (event) {
        if (auto != null) {
            sirena.rotate(3, auto.position);
            // Se actualiza la ubicacion del auto, segun la velocidad
            var xp = auto.position.x + (Math.cos(autoAngulo) * autoVelocidad);
            var yp = auto.position.y + (Math.sin(autoAngulo) * autoVelocidad);
            auto.position.x = Math.max(0, Math.min(xp, view.size.width));
            auto.position.y = Math.max(0, Math.min(yp, view.size.height));
            autoVelocidad = autoVelocidad * 0.9;

        };
        
    };


    function jugar() {

        // Limpio la capa del auto e inicializo un nuevo auto
        autoLayer.clear();
        auto = new Group(); 

        chasis = new Path.Rectangle(new Point(50, 50), new Size(100, 50));
        chasis.style = {
            fillColor: 'white',
            strokeColor: 'black'
        };
        auto.addChild(chasis);

        cabina = new Path.Rectangle(new Point(50 + 25, 50), new Size(50, 50));
        cabina.style = {
            fillColor: 'red',
            strokeColor: 'black'
        };
        auto.addChild(cabina);

        llantaDI = new Path.RoundRectangle(new Rectangle(new Point(50 + 10, 50 - 5), new Point(80, 55 - 5)), new Size(2, 2));
        llantaDD = new Path.RoundRectangle(new Rectangle(new Point(150 - 30, 50 - 5), new Point(140, 55 - 5)), new Size(2, 2));
        llantaTI = new Path.RoundRectangle(new Rectangle(new Point(50 + 10, 100), new Point(80, 105)), new Size(2, 2));
        llantaTD = new Path.RoundRectangle(new Rectangle(new Point(150 - 30, 100), new Point(140, 105)), new Size(2, 2));
        llantaDI.fillColor = 'black';
        llantaDD.fillColor = 'black';
        llantaTI.fillColor = 'black';
        llantaTD.fillColor = 'black';
        auto.addChild(llantaDI);
        auto.addChild(llantaDD);
        auto.addChild(llantaTI);
        auto.addChild(llantaTD);

        luzDI = new Path();
        luzDI.add(new Point(45, 15 + 50));
        luzDI.add(new Point(45, 5 + 50));
        luzDI.add(new Point(50, 10 + 50));
        luzDI.closed = true;
        luzDD = new Path();
        luzDD.add(new Point(45, 45 + 50));
        luzDD.add(new Point(45, 35 + 50));
        luzDD.add(new Point(50, 40 + 50));
        luzDD.closed = true;
        luzDD.fillColor = 'yellow';
        luzDD.strokeColor = 'black';
        luzDI.fillColor = 'yellow';
        luzDI.strokeColor = 'black';
        auto.addChild(luzDD);
        auto.addChild(luzDD);
        auto.addChild(luzDI);
        auto.addChild(luzDI);

        basesirena = new Path.Circle(new Point(50 + 50, 50 + 25), 5);
        basesirena.fillColor = 'blue';
        auto.addChild(basesirena);

        sirena = new Path();
        sirena.add(new Point(50 + 50 - 5, 50 + 25 + 25));
        sirena.add(new Point(50 + 50, 50 + 25));
        sirena.add(new Point(50 + 50 + 5, 50 + 25 + 25));
        sirena.closed = true;
        sirena.fillColor = 'blue';
        auto.addChild(sirena);

        autoLayer.addChild(auto);
        autoVelocidad = 0;

        autoAngulo = (autoAngulo0 + 360) * (Math.PI / 180);
        auto.rotate(autoAngulo0 + 180);
        auto.position = autoPosicion0;
    };


}

