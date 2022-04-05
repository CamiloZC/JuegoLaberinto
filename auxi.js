function iterate() {
    this.checkBorders();
    if (this.vector.length > this.maxVec)
        this.vector.length = this.maxVec;
    this.point += this.vector;
    this.updateShape();
}

function checkBorders() {
    var size = view.size;
    if (this.point.x < -this.radius)
        this.point.x = size.width + this.radius;
    if (this.point.x > size.width + this.radius)
        this.point.x = -this.radius;
    if (this.point.y < -this.radius)
        this.point.y = size.height + this.radius;
    if (this.point.y > size.height + this.radius)
        this.point.y = -this.radius;
}

function updateShape() {
    var segments = this.path.segments;
    for (var i = 0; i < this.numSegment; i ++)
        segments[i].point = this.getSidePoint(i);

    this.path.smooth();
    for (var i = 0; i < this.numSegment; i ++) {
        if (this.boundOffset[i] < this.radius / 4)
            this.boundOffset[i] = this.radius / 4;
        var next = (i + 1) % this.numSegment;
        var prev = (i > 0) ? i - 1 : this.numSegment - 1;
        var offset = this.boundOffset[i];
        offset += (this.radius - offset) / 15;
        offset += ((this.boundOffset[next] + this.boundOffset[prev]) / 2 - offset) / 3;
        this.boundOffsetBuff[i] = this.boundOffset[i] = offset;
    }
}

function react(b) {
    var dist = this.point.getDistance(b.point);
    if (dist < this.radius + b.radius && dist != 0) {
        var overlap = this.radius + b.radius - dist;
        var direc = (this.point - b.point).normalize(overlap * 0.015);
        this.vector += direc;
        b.vector -= direc;

        this.calcBounds(b);
        b.calcBounds(this);
        this.updateBounds();
        b.updateBounds();
    }
}

function getBoundOffset (b) {
    var diff = this.point - b;
    var angle = (diff.angle + 180) % 360;
    return this.boundOffset[Math.floor(angle / 360 * this.boundOffset.length)];
}

function calcBounds(b) {
    for (var i = 0; i < this.numSegment; i ++) {
        var tp = this.getSidePoint(i);
        var bLen = b.getBoundOffset(tp);
        var td = tp.getDistance(b.point);
        if (td < bLen) {
            this.boundOffsetBuff[i] -= (bLen  - td) / 2;
        }
    }
}

function getSidePoint(index) {
    return this.point + this.sidePoints[index] * this.boundOffset[index];
}

function updateBounds() {
    for (var i = 0; i < this.numSegment; i ++)
        this.boundOffset[i] = this.boundOffsetBuff[i];
}

function Ball(r, p, v) {
    let ball = {}
    ball.radius = r;
    ball.point = p;
    ball.vector = v;
    ball.maxVec = 15;
    ball.numSegment = Math.floor(r / 3 + 2);
    ball.boundOffset = [];
    ball.boundOffsetBuff = [];
    ball.sidePoints = [];
    ball.path = new Path({
        fillColor: {
            hue: Math.random() * 360,
            saturation: 1,
            brightness: 1
        },
        blendMode: 'lighter'
    });

    for (var i = 0; i < ball.numSegment; i ++) {
        ball.boundOffset.push(ball.radius);
        ball.boundOffsetBuff.push(ball.radius);
        ball.path.add(new Point());
        ball.sidePoints.push(new Point({
            angle: 360 / ball.numSegment * i,
            length: 1
        }));
    }
}