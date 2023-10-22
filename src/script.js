import * as THREE from "three";

THREE.ColorManagement.enabled = false;

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

//** TEXTURES */
const textureLoader = new THREE.TextureLoader();
const matcap3Texture = textureLoader.load("/textures/matcaps/3.png");

//** MATERIALS */

const sphere1Material = new THREE.MeshMatcapMaterial();
sphere1Material.matcap = matcap3Texture;
sphere1Material.opacity = 0.7;

const sphere2Material = new THREE.MeshBasicMaterial();
sphere2Material.color = new THREE.Color("rgb(194, 214, 255)");
sphere2Material.transparent = true;
sphere2Material.opacity = 0.2;
sphere2Material.wireframe = true;

//** OBJECTS - SPHERES */

const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  sphere1Material
);

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 16, 16),
  sphere2Material
);
sphere2.scale.set(0.5, 20, 20);

scene.add(sphere1, sphere2);

//** SIZE */

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//** RESIZE */

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//** FULLSCREEN */

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

//** CAMERA */

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 3;
scene.add(camera);

//** RENDERER */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);

//** ANIMATION */

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere1.rotation.x = elapsedTime * 2;
  sphere2.position.x = Math.cos(elapsedTime) * Math.PI * 0.5;

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
