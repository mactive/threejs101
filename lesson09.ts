import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

const gui = new GUI();
// Scene
const scene = new THREE.Scene();

const sizes = {
  width: 1200,
  height: 800,
};

let count = 500
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

gui.add(mesh.position, 'y').min(-3).max(3).step(0.001).name('meshPositionY');
gui.add(mesh.position, 'x').min(-3).max(3).step(0.001).name('meshPositionX');
gui.add(mesh.position, 'z').min(-3).max(3).step(0.001).name('meshPositionZ');
// 用于 gui 控制 count 的对象
const params = {
  count: count
};
// 添加 count 到 gui，可以通过滑块调整
gui.add(params, 'count').min(100).max(1000).step(100).name('count').onChange((value: number) => {
  // 这里可以根据需要动态更新点的数量
  // 例如：重新生成 positionsArray、positions、geometry 等
  // 这里只是同步变量
  count = value;
  // 实际项目中建议在这里加上重建 mesh 的逻辑
 
  // 重新生成 positionsArray
  const newPositionsArray = new Array(value * 3 * 3).fill(0);
  for (let i = 0; i < value * 3 * 3; i++) {
    newPositionsArray[i] = (Math.random() - 0.5) * 3;
  }
  // 生成新的 Float32Array
  const newPositions = new Float32Array(newPositionsArray);
  // 创建新的 BufferAttribute
  const newPositionsAttributes = new THREE.BufferAttribute(newPositions, 3);
  // 创建新的 BufferGeometry
  const newGeometry = new THREE.BufferGeometry();
  newGeometry.setAttribute('position', newPositionsAttributes);
  // 替换 mesh 的 geometry
  mesh.geometry.dispose(); // 释放旧的几何体资源
  mesh.geometry = newGeometry;
});

// 用于 gui 控制 material color 的对象
const colorParams = {
  color: '#00ff00' // 初始颜色，和 material 保持一致
};
// 添加 color 到 gui，可以通过颜色选择器调整
gui.addColor(colorParams, 'color').name('materialColor').onChange((value: string) => {
  // 这里重建 material
  // 释放旧的材质资源
  mesh.material.dispose();
  // 创建新的材质并赋值
  mesh.material = new THREE.MeshBasicMaterial({ color: value, wireframe: true });
});


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