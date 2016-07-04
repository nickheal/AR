var View3d = (function () {
	'use strict';

    var View3d;

    View3d = function () {
    	var fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, container, handleWindowResize;

		handleWindowResize = function () {
			HEIGHT = window.innerHeight;
			WIDTH = window.innerWidth;
			this.renderer.setSize(WIDTH, HEIGHT);
			this.camera.aspect = WIDTH / HEIGHT;
			this.camera.updateProjectionMatrix();
		}.bind(this);

		HEIGHT = window.innerHeight;
		WIDTH = window.innerWidth;

		this.scene = new THREE.Scene();

		this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
		
		aspectRatio = WIDTH / HEIGHT;
		fieldOfView = 60;
		nearPlane = 1;
		farPlane = 10000;
		this.camera = new THREE.PerspectiveCamera(
			fieldOfView,
			aspectRatio,
			nearPlane,
			farPlane
		);
		
		this.camera.position.x = 0;
		this.camera.position.z = 0;
		this.camera.position.y = 0;
		
		this.renderer = new THREE.WebGLRenderer({ 
			alpha: true, 
			antialias: true 
		});

		this.renderer.setSize(WIDTH, HEIGHT);
		
		this.renderer.shadowMap.enabled = true;
		
		container = document.getElementById('graphics-holder');
		container.appendChild(this.renderer.domElement);
		
		window.addEventListener('resize', handleWindowResize, false);

		// create lights
		var hemisphereLight, shadowLight;

		hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9);
		
		shadowLight = new THREE.DirectionalLight(0xffffff, .9);

		shadowLight.position.set(150, 350, 350);
		
		shadowLight.castShadow = true;

		shadowLight.shadow.camera.left = -400;
		shadowLight.shadow.camera.right = 400;
		shadowLight.shadow.camera.top = 400;
		shadowLight.shadow.camera.bottom = -400;
		shadowLight.shadow.camera.near = 1;
		shadowLight.shadow.camera.far = 1000;

		shadowLight.shadow.mapSize.width = 2048;
		shadowLight.shadow.mapSize.height = 2048;
		
		this.scene.add(hemisphereLight);  
		this.scene.add(shadowLight);

		var i;
		for (i = 0; i < 30; i++) {
			var mesh, geom, mat, m;
			mesh = new THREE.Object3D();
			geom = new THREE.BoxGeometry(20,20,20);
			mat = new THREE.MeshPhongMaterial({
				color:0x0000ff
			});
			m = new THREE.Mesh(geom, mat);
			this.scene.add(m);
			m.position.x = (Math.random() - .5) * 500;
			m.position.y = (Math.random() - .5) * 500;
			m.position.z = (Math.random() - .5) * 500;
		}

		this.loop();

		// Set up accelorometer movement control
		window.addEventListener("deviceorientation", function (e) {
			var conv = Math.PI / 180;
            this.camera.rotation.x = -e.beta * conv;
            this.camera.rotation.y = -e.gamma * conv;
            this.camera.rotation.z = e.alpha * conv;
        }.bind(this), true);
    }

    View3d.prototype.loop = function () {
    	this.renderer.render(this.scene, this.camera);

		requestAnimationFrame(this.loop.bind(this));
    }

    return View3d;

})();