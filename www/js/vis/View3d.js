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
			this.effect.setSize(WIDTH, HEIGHT);
		}.bind(this);

		HEIGHT = window.innerHeight;
		WIDTH = window.innerWidth;

		this.clickTargets = [];
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

		this.effect = new THREE.StereoEffect(this.renderer);
		this.effect.eyeSeparation = 200;
		this.effect.setSize(WIDTH, HEIGHT);

		this.controls = new THREE.DeviceOrientationControls(this.camera, true);

		// View clicking
		this.clickVector = new THREE.Vector3();
		this.raycaster = new THREE.Raycaster();

		this.loop();
    }

    View3d.prototype.loop = function () {
    	// Check for clicks
    	var vector, raycaster, intersects;
		vector = this.clickVector;
		this.clickVector.set(0, 0, 0.5);
		raycaster = this.raycaster;
		vector.unproject(this.camera);
		raycaster.set(this.camera.position, vector.sub(this.camera.position).normalize());
		intersects = raycaster.intersectObjects(this.clickTargets);
		if (intersects.length) {
			intersects.sort(function (a, b) {
				return a.distance - b.distance;
			});
			intersects[0].object.clickFunction();
		}
		// --

    	this.controls.update();
    	
    	this.effect.render(this.scene, this.camera);

		requestAnimationFrame(this.loop.bind(this));
    }

    return View3d;

})();