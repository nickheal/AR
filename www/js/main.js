var app = (function () {
    'use strict';

    var app;

    app = {
        init: function () {
            var view3d;

            view3d = new View3d();
        }
    };

    return app;

})();

$(document).ready(function () {
    app.init();
});