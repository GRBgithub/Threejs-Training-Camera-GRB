import React from "react";
import * as THREE from "three";
import styled from "styled-components";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
/* eslint import/no-webpack-loader-syntax: off */
import * as fragment from "!raw-loader!glslify-loader!./shader/fragment.glsl";
/* eslint import/no-webpack-loader-syntax: off */
import * as vertex from "!raw-loader!glslify-loader!./shader/vertex.glsl";



import water from "../../assets/img/water.jpeg";
const Threejs = () => {
  React.useEffect(() => {
    ThreejsStart();
  }, []);

   const ThreejsStart = () => {
//sizes
const sizes = {
    width: 800,
    height: 600,
  };


//Cursor
const cursor={
  x:0,
  y:0
}
window.addEventListener("mousemove",(e)=>{
cursor.x = e.clientX / sizes.width -0.5
cursor.y = e.clientY / sizes.height -0.5
})
// Scene
const scene = new THREE.Scene();
// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);
// Camera
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,100);
// const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1,100);
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);



// Renderer
const canvas = document.querySelector(".webgl");

// controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true; // damping don't forget to update the controls on tick

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();
    // Update objects
    // mesh.rotation.y = elapsedTime;
    // update camera
      // camera.position.set(Math.sin(-cursor.x*Math.PI*2)*3,cursor.y*10,Math.cos(cursor.x * Math.PI*2)*3);
      // camera.lookAt(mesh.position);
    controls.update();
    // Render
    renderer.render(scene, camera);
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}
tick();
  };
  return (
    <Container>
      <canvas className="webgl"></canvas>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
export default Threejs;
