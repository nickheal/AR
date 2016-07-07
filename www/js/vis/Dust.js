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
        var scene, number, motes, geom, mat, highlightMaterial, m, i;

        scene = this.scene.scene;
        number = this.number;
        motes = this.motes;

        geom = new THREE.SphereGeometry(5,32,32);
        for (i = 0; i < number; i++) {
            highlightMaterial = new THREE.MeshPhongMaterial({
                color: 0x00ff00
            });
            mat = new THREE.MeshPhongMaterial({
                color:0x0000ff
            });
            m = new THREE.Mesh(geom, mat);
 
            m.position.x = (Math.random() - .5) * 100;
            m.position.y = (Math.random() - .5) * 100;
            m.position.z = (Math.random() - .5) * 100;

            motes.push(m);
            scene.add(m);

            motes[i].matCache = {
                mat: mat,
                highlightMaterial: highlightMaterial
            }

            m.castShadow = true;
            m.receiveShadow = true;

            m.hoverIn = function (mote) {
                mote.material = mote.matCache.highlightMaterial;
            }.bind(this, this.motes[i]);
            m.hoverOut = function (mote) {
                if (!mote.deleting) {
                    mote.material = mote.matCache.mat;
                }
            }.bind(this, this.motes[i]);
            m.click = function (i, mote) {
                mote.deleting = true;
                TweenMax.to(mote.scale, 1, {
                    x: 2,
                    y: 2,
                    z: 2
                });
                mote.material.transparent = true;
                TweenMax.to(mote.material, 1, {
                    opacity: 0,
                    onComplete: function (motes, i, material, scene, clickTargets) {
                        scene.remove(mote);
                        clickTargets.splice(clickTargets.indexOf(mote), 1);
                        motes.splice(motes.indexOf(mote), 1);
                        material.opacity = 1;
                    },
                    onCompleteParams: [this.motes, i, mote.material, this.scene.scene, this.scene.clickTargets]
                });
            }.bind(this, i, this.motes[i])
            this.scene.clickTargets.push(m);
        }
    }

    Dust.prototype.animate = function () {
        var motes, mote, i;

        motes = this.motes;

        for (i = 0; i < motes.length; i++) {
            mote = motes[i];
            TweenMax.to(mote.position, 200, {
                x: (Math.random() - .5) * 100,
                y: (Math.random() - .5) * 100,
                z: (Math.random() - .5) * 100
            });
        }
    }

    return Dust;
})();