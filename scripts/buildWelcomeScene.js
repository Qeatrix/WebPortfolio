const SEPARATION = 100,
  AMOUNTX = 150,
  AMOUNTY = 150;

let container, stats;
let camera, scene, renderer;

let particles,
  addValue = 0.1,
  fovValue = 40,
  fovTime = 0,
fovIncrement = 1 * 5 / 60,
  count = 0;

let mouseX = 0,
  mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();
animate();

function bezier(t, initial, p1, p2, final) {
  return (
    (1 - t) * (1 - t) * (1 - t) * initial +
    3 * (1 - t) * (1 - t) * t * p1 +
    3 * (1 - t) * t * t * p2 +
    t * t * t * final
  );
}

function init() {
  container = document.createElement("div");
  container.className = "canvas";
  document.getElementById("welcome-screen").appendChild(container);

  camera = new THREE.PerspectiveCamera(
    15,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.x= 2500;
  camera.position.y = 140;
  camera.position.z = 7000;
  camera.rotation.y = 113.95;
  camera.rotation.x = 220;
  console.log(camera.rotation.x);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070707);

  //

  const numParticles = AMOUNTX * AMOUNTY;

  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);

  let i = 0,
    j = 0;

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
      positions[i + 1] = 0; // y
      positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z

      scales[j] = 1;

      i += 3;
      j++;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xffffff) }
    },
    vertexShader: document.getElementById("vertexshader").textContent,
    fragmentShader: document.getElementById("fragmentshader").textContent
  });

  //

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  container.style.touchAction = "none";

  //

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//
const fov = camera.fov; // Get the initial FOV value

function animate() {
  requestAnimationFrame(animate);

  render();
}

gsap.to(camera, {duration: 2, fov: 35, ease: "power2.out", onUpdate: function () {
      // Update the camera's FOV during the animation
      camera.updateProjectionMatrix(); // Update the projection matrix for changes to take effect
    },});

function render() {

  const positions = particles.geometry.attributes.position.array;
  const scales = particles.geometry.attributes.scale.array;

  let i = 0,
    j = 0;

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      positions[i + 1] =
        Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;

      scales[j] =
        (Math.sin((ix + count) * 0.3) + 1) * 20 +
        (Math.sin((iy + count) * 0.5) + 1) * 20;

      i += 3;
      j++;
    }
  }

  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.scale.needsUpdate = true;

  renderer.render(scene, camera);

  if (addValue > 0.011) {
    addValue -= 0.0005;
  }
  
  count += addValue;
}

