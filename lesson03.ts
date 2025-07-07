import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

const sizes = {
  width: 600,
  height: 400,
};

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);


// Renderer
const canvas = document.querySelector('#canvas-id') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// Animation
renderer.render(scene, camera);

// // Animation
function animate() {
  window.requestAnimationFrame(animate);
  mesh.rotation.z += 0.01;
  renderer.render(scene, camera);
}
animate();