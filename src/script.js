import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

THREE.ColorManagement.enabled = false;

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

//** OBJECTS */

const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

scene.add(mesh);

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

//** CONTROLS */

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

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

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
