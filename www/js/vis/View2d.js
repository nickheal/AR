var View2d = (function () {
	'use strict';

    var View2d;

    View2d = function () {
    	var width, height;

    	width = window.innerWidth;
    	height = window.innerHeight;

		this.renderer = PIXI.autoDetectRenderer(width, height, {antialias:true, transparent:true});
		document.getElementById('graphics-holder').appendChild(this.renderer.view);
		$(this.renderer.view).addClass('pixi-render');
		this.stage = new PIXI.Container();
		this.loop();
    }

    View2d.prototype.loop = function () {
    	this.renderer.render(this.stage);

		requestAnimationFrame(this.loop.bind(this));
    }

    return View2d;

})();