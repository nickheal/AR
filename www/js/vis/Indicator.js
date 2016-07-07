var Indicator = (function () {
	'use strict';

    var Indicator;

    /*
     * params.stage
     */
    Indicator = function (params) {
    	this.stage = params.stage;
        this.size = 10;
    }

    Indicator.prototype.draw = function () {
        var width, height, colour, size;
        width = window.innerWidth;
        height = window.innerHeight;
        colour = '0x000000';
        size = this.size;

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

    /*
     * callback - the function to activate on click
     * time - how long the countdown takes
     */
    Indicator.prototype.click = function (callback, time) {
        var pointPos, size, charger, width, height, startColour;
        size = this.size + 5;
        width = window.innerWidth;
        height = window.innerHeight;
        this.charger = new PIXI.Graphics();
        charger = this.charger;
        this.stage.addChild(charger);

        startColour = 50;

        this.chargeUp = TweenMax.to({r: 0}, time / 1000, {
            r: 360,
            ease: Linear.easeNone,
            onUpdate: function (self) {
                var colour;
                colour = Math.round(self.target.r * 0.7);
                colour = '0x' + colour.toString(16) + '0000';
                charger.beginFill(colour);
                pointPos = tools.getPointOnCircleCircumference(width * .25, height * .5, size, self.target.r - 90);
                charger.drawCircle(pointPos.x, pointPos.y, 3);
                pointPos = tools.getPointOnCircleCircumference(width * .75, height * .5, size, self.target.r - 90);
                charger.drawCircle(pointPos.x, pointPos.y, 3);
            },
            onUpdateParams: ["{self}"],
            onComplete: function (stage) {
                stage.removeChild(charger);
                callback();
            },
            onCompleteParams: [this.stage]
        });
    }

    Indicator.prototype.cancel = function () {
        this.chargeUp.kill();
        this.stage.removeChild(this.charger);
    }

    return Indicator;

})();