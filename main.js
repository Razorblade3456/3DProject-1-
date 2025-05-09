// Setup basic 3D scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

// Load texture and add object
const abrahamTexture = new THREE.TextureLoader().load('Normal.png');
const abraham = new THREE.Mesh(
  new THREE.IcosahedronGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: abrahamTexture })
);
scene.add(abraham);
abraham.position.set(10, 8, 15);

// Add light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// ✅ OrbitControls now defined
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Add stars
const starTexture = new THREE.TextureLoader().load('Bubbles.png');
function addStar() {
  const geometry = new THREE.SphereGeometry(0.4, 24, 24);
  const material = new THREE.MeshBasicMaterial({ map: starTexture });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// Set background
const oceanTexture = new THREE.TextureLoader().load('OceanBG1.jpg');
scene.background = oceanTexture;

//making the canvas resize dynamically
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  abraham.rotation.y += 0.008;
  controls.update();
  renderer.render(scene, camera);
}
animate();
