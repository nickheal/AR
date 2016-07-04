var Dust = (function () {
	'use strict';

    var Dust;

    /*
     * params.scene
     * params.number
     */
    Dust = function (params) {
    	this.scene = params.scene;
        this.number = params.number;

    	this.motes = [];
    }

    Dust.prototype.draw = function () {
        var scene, number, motes, geom, mat, m, i;

        scene = this.scene;
        number = this.number;
        motes = this.motes;

        for (i = 0; i < number; i++) {
            geom = new THREE.BoxGeometry(10, 10, 10);
            mat = new THREE.MeshPhongMaterial({
                color:0x0000ff
            });
            m = new THREE.Mesh(geom, mat);
 
            m.position.x = (Math.random() - .5) * 1000;
            m.position.y = (Math.random() - .5) * 1000;
            m.position.z = (Math.random() - .5) * 1000;

            motes.push(m);
            scene.add(m);
        }
    }

    Dust.prototype.animate = function () {
        var motes, mote, i;

        motes = this.motes;

        for (i = 0; i < motes.length; i++) {
            mote = motes[i];
            TweenMax.to(mote.position, 200, {
                x: (Math.random() - .5) * 1000,
                y: (Math.random() - .5) * 1000,
                z: (Math.random() - .5) * 1000
            });
        }
    }

    return Dust;
})();