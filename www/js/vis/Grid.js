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
    	var geom, mat, m, rowLength, rowCount, i, spacing;

    	rowLength = Math.sqrt(this.data.total);
    	rowCount = 0;
    	spacing = this.cubeSize * 1.5;

		for (i = 0; i < this.data.total; i++) {
			geom = new THREE.BoxGeometry(this.cubeSize, this.cubeSize, this.cubeSize);
			mat = new THREE.MeshPhongMaterial({
				color:0x0000ff
			});
			m = new THREE.Mesh(geom, mat);

			m.position.x = this.x + ((i % rowLength) * spacing);
			m.position.y = this.y + (rowCount * spacing);
			m.position.z = this.z;

			this.cubes.push(m);
			this.scene.add(m);

			rowCount = rowCount > rowLength ? 0 : rowCount + 1;
		}
    }

    return Grid;

})();