function Vector2D(x, y) {
    this.x = x;
    this.y = y;
    
    this.rotate = function(deg) {
        var rad = deg * Math.PI/180;
        var x = this.x;
        var y = this.y;
        
        this.x = x*Math.cos(rad) - y*Math.sin(rad);
        this.y = x*Math.sin(rad) + y*Math.cos(rad);
    }

    this.translate = function(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }

    this.itranslate = function(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
    }

    this.scale = function(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
    }

    this.mult = function(arg) {
        if(typeof(arg) == "number") {
            this.x *= arg;
            this.y *= arg;
        }
        else {
            this.x *= arg.x;
            this.y *= arg.y;
        }
    }

    this.div = function(arg) {
        if(typeof(arg) == "number") {
            this.x /= arg;
            this.y /= arg;
        }
        else {
            this.x /= arg.x;
            this.y /= arg.y;
        }
    }
}
