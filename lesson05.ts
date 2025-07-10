import * as THREE from 'three';
import gsap from 'gsap';

// Scene
const scene = new THREE.Scene();

const sizes = {
  width: 800,
  height: 600,
};

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.x = 1;
mesh.position.y = -1;
mesh.position.z = -1;

// mesh.rotation.z = Math.PI / 4;

// Axis Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
console.log("mesh.position.length()",mesh.position.length());

// Camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 10;
// camera.position.y = 4;
scene.add(camera);

// 镜头指向mesh
camera.lookAt(mesh.position)

// Renderer
const canvas = document.querySelector('#canvas-id') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// push to right
gsap.to(mesh.position, {
  x: 3,
  duration: 1,
  delay: 0,
})

// pull to left
gsap.to(mesh.position, {
  x: 0,
  duration: 1,
  delay: 1,
})

// Animation
// renderer.render(scene, camera); // we have animate() 



let time = new THREE.Clock();
// // Animation
function animate() {
  const elapsedTime = time.getElapsedTime();
  console.log("elapsedTime",elapsedTime);
  mesh.rotation.z = elapsedTime * Math.PI;
  // mesh.position.x = Math.sin(elapsedTime);
  mesh.position.y = Math.cos(elapsedTime);

  // camera.lookAt(mesh.position)

  // mesh.rotation.z += 0.001 * deltaTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();