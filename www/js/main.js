var app = (function () {
    'use strict';

    var app;

    app = {
        init: function () {
            var view3d, grid, dust;

            //window.plugins.insomnia.keepAwake();

            view3d = new View3d();

            grid = new Grid({
                scene: view3d,
                x: 0,
                y: 0,
                z: 100,
                cubeSize: 20,
                data: {
                    total: 20
                }
            });
            grid.draw();

            dust = new Dust({
                scene: view3d,
                number: 200
            });
            dust.draw();
            dust.animate();
        }
    };

    return app;

})();

$(document).ready(function () {
    app.init();
});