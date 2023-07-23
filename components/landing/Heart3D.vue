<template>
  <div id="heart3d"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

onMounted(() => {
  let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    effect: AsciiEffect;
  let heart: THREE.Object3D;
  const start = Date.now();
  init();
  animate();
  function init() {
    camera = new THREE.PerspectiveCamera(70, 750 / 750, 1, 750);
    camera.position.y = 500;
    camera.position.z = 500;

    scene = new THREE.Scene();

    const pointLight1 = new THREE.AmbientLight(0xffffff);
    pointLight1.position.set(500, 500, 500);
    scene.add(pointLight1);

    const pointLight2 = new THREE.AmbientLight(0xffffff);
    pointLight2.position.set(-500, -500, -500);
    scene.add(pointLight2);

    const loader = new GLTFLoader();

    loader.load(
      "assets/three/heart.glb",
      function (gltf) {
        scene.add(gltf.scene);
        heart = gltf.scene.children[0]
        heart.position.y = 500;
        heart.position.x = 0;
        heart.position.z = 495;
        (heart as any).material.wireframe = true;
        heart.receiveShadow = true;
        (heart as any).material.color = {
          r: 255,
          g: 255,
          b: 255,
          isColor: false
        }

        console.log((heart as any).material.color)
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
   
    //scene.add(heart);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth / 2, window.innerHeight - 200);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    document.getElementById("heart3d")?.appendChild(renderer.domElement);
    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = 750 / window.innerHeight / 3;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth / 2, window.innerHeight - 200);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    const timer = Date.now() - start;
    if(heart){
      heart.rotation.y = timer * 0.0009;
    }
    renderer.render(scene, camera)
  }
});
</script>
