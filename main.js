import { loadGLTF, loadVideo } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {

  // // let video0 = null;
  // // const init1 = async () => {
  // //   video0 = await loadVideo("Disney.mp4");
  // //   texture = new THREE.VideoTexture(video0);
  // //   video0.play();
  // //   video0.pause();
  // // }

  // let video1 = null;
  // const init2 = async () => {
  //   video1 = await loadVideo("SMILY2.mp4");
  //   texture = new THREE.VideoTexture(video1);
  //   video1.play();
  //   video1.pause();
  // }
//test


  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets.mind',
    });
    const { renderer, scene, camera } = mindarThree;

    // const mindarThree1 = new window.MINDAR.IMAGE.MindARThree({
    //   container: document.body,
    //   imageTargetSrc: './assets/targets/SMILY.mind',
    // });
    // const { renderer, scene, camera } = mindarThree1;
    
    

    const video0 = await loadVideo("Disney.mp4");
    const video1 = await loadVideo("snow.mp4");
    const texture0 = new THREE.VideoTexture(video0);
    const texture1 = new THREE.VideoTexture(video1);


    const geometry = new THREE.PlaneGeometry(1, 270 / 480);
    const material0 = new THREE.MeshBasicMaterial({ map: texture0 });
    const material1 = new THREE.MeshBasicMaterial({ map: texture1 });
    const plane0 = new THREE.Mesh(geometry, material0);
    const plane1 = new THREE.Mesh(geometry, material1);


    const anchor0 = mindarThree.addAnchor(0);
    const anchor1 = mindarThree.addAnchor(1);
    anchor0.group.add(plane0);
    anchor1.group.add(plane1);


    anchor0.onTargetFound = () => {
      video0.play();
    }
    anchor0.onTargetLost = () => {
      video0.pause();
    }
    video0.addEventListener('play', () => {
      video0.currentTime = 0;
    });

    anchor1.onTargetFound = () => {
      video1.play();
    }
    anchor1.onTargetLost = () => {
      video1.pause();
    }
    video1.addEventListener('play', () => {
      video1.currentTime = 0;
    });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });


  }
  // start();
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  restartButton.addEventListener("click", start);
  document.body.appendChild(restartButton);
});