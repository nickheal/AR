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

		this.controls = new THREE.DeviceOrientationControls(this.camera, true);

		this.loop();
    }

    View3d.prototype.loop = function () {
    	this.controls.update();
    	
    	this.renderer.render(this.scene, this.camera);

		requestAnimationFrame(this.loop.bind(this));
    }

    return View3d;

})();