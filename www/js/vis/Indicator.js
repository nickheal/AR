var Indicator = (function () {
	'use strict';

    var Indicator;

    /*
     * params.stage
     */
    Indicator = function (params) {
    	this.stage = params.stage;
    }

    Indicator.prototype.draw = function () {
        var width, height, colour, size;
        width = window.innerWidth;
        height = window.innerHeight;
        colour = '0x000000';
        size = 10;

        this.graphic = {
            left: null,
            right: null
        }

    	this.graphic.left = new PIXI.Graphics();
        this.graphic.left.tint = colour;
        this.graphic.left.lineStyle(3, 0xFF0000);
        this.graphic.left.drawCircle(0, 0, size);
        this.graphic.left.alpha = .2;
        this.graphic.left.position.x = width * .25;
        this.graphic.left.position.y = height * .5;
        this.stage.addChild(this.graphic.left);

        this.graphic.right = new PIXI.Graphics();
        this.graphic.right.tint = colour;
        this.graphic.right.lineStyle(3, 0xFF0000);
        this.graphic.right.drawCircle(0, 0, size);
        this.graphic.right.alpha = .2;
        this.graphic.right.position.x = width * .75;
        this.graphic.right.position.y = height * .5;
        this.stage.addChild(this.graphic.right);
    }

    return Indicator;

})();