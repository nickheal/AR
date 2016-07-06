var Grid = (function () {
	'use strict';

    var Grid;

    /*
     * params.scene
     * params.x
     * params.y
     * params.z
     * params.cubeSize
     * params.data
     * params.data.total
     */
    Grid = function (params) {
    	this.scene = params.scene;
    	this.x = params.x;
    	this.y = params.y;
    	this.z = params.z;
    	this.cubeSize = params.cubeSize;
    	this.data = params.data;

    	this.cubes = [];
    }

    Grid.prototype.draw = function () {
    	var geom, mat, highlightMaterial, m, rowLength, rowCount, i, spacing;

    	rowLength = Math.sqrt(this.data.total);
    	rowCount = 0;
    	spacing = this.cubeSize * 1.5;

        highlightMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff00
        });

        geom = new THREE.BoxGeometry(this.cubeSize, this.cubeSize, this.cubeSize);
		for (i = 0; i < this.data.total; i++) {
			mat = new THREE.MeshPhongMaterial({
				color:0x0000ff
			});
			m = new THREE.Mesh(geom, mat);

			m.position.x = this.x + ((i % rowLength) * spacing);
			m.position.y = this.y + (rowCount * spacing);
			m.position.z = this.z;

			this.cubes.push(m);
			this.scene.scene.add(m);

            m.castShadow = true;
            m.receiveShadow = true;

            m.clickFunction = function (i) {
                var cube = this.cubes[i];
                if (!cube.animating) {
                    cube.animating = true;
                    cube.material = highlightMaterial;
                    TweenMax.to(cube.scale, .25, {
                        x:1.2,
                        y:1.2,
                        z:1.2,
                        yoyo: true,
                        repeat: 1
                    });
                }
            }.bind(this, i)
            this.scene.clickTargets.push(m);

			rowCount = rowCount > rowLength ? 0 : rowCount + 1;
		}
    }

    return Grid;

})();