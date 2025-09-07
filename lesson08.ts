import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Scene
const scene = new THREE.Scene();

const sizes = {
  width: 800,
  height: 600,
};

const count = 500
const positionsArray = new Array(count * 3 * 3).fill(0);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 3;
}

const positions = new Float32Array(positionsArray);

const positionsAttributes = new THREE.BufferAttribute(positions, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', positionsAttributes);

// Object
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 0;


// Axis Helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);
// console.log("mesh.position.length()",mesh.position.length());

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
console.log('renderer.getPixelRatio()', renderer.getPixelRatio());
renderer.setPixelRatio(window.devicePixelRatio);

// orbit control
const orbitControl = new OrbitControls(camera, canvas);
orbitControl.enableDamping = true;
orbitControl.enableZoom = true;
orbitControl.enablePan = true;
orbitControl.enableRotate = true;


let time = new THREE.Clock();
// // Animation
function animate() {
  // rotate mesh
  mesh.rotation.y += 0.005;
  renderer.render(scene, camera);
  // renderer.setPixelRatio(window.devicePixelRatio)
  window.requestAnimationFrame(animate);
}
animate();

window.addEventListener('dblclick', ()=> {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})