import "./styles.css"; // keep this here!

// naimportujte vše co je potřeba z BabylonJS
import {
  Engine,
  Scene,
  MeshBuilder,
  StandardMaterial,
  DirectionalLight,
  Vector3,
  Color3,
  SceneLoader,
  DeviceOrientationCamera,
  Mesh,
  Animation,
  Space,
  Axis
} from "@babylonjs/core";
import "@babylonjs/inspector";

const canvas = document.getElementById("renderCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = new Engine(canvas, true);

const scene = new Scene(engine);

const camera = new DeviceOrientationCamera(
  "kamera",
  new Vector3(100, 5, 70),
  scene
);

camera.setTarget(new Vector3(0, 0, 6));

camera.attachControl(canvas, true);

const light1 = new DirectionalLight(
  "DirectionalLight",
  new Vector3(-1, -1, -1),
  scene
);

var vreten = MeshBuilder.CreateCylinder("vreten", { diameter: 0.0001 });
SceneLoader.ImportMesh("", "public/", "vreten.obj", scene, function (
  newMeshes
) {
  // Pozice, měřítko a rotace
  newMeshes[0].scaling = new Vector3(0.15, 0.15, 0.175);
  newMeshes[0].rotate(new Vector3(-1, 0, 0), Math.PI / 2);
  newMeshes[0].position.z = 0;
  newMeshes[0].position.x = 0;
  newMeshes[0].position.y = 30;
  vreten = newMeshes[0];
});
var vreten2 = MeshBuilder.CreateCylinder("vreten2", { diameter: 0.0001 });
SceneLoader.ImportMesh("", "public/", "vreten.obj", scene, function (
  newMeshes
) {
  // Pozice, měřítko a rotace
  newMeshes[0].scaling = new Vector3(0.15, 0.15, 0.175);
  newMeshes[0].rotate(new Vector3(1, 0, 0), Math.PI / 2);
  newMeshes[0].position.z = 0;
  newMeshes[0].position.x = 0;
  newMeshes[0].position.y = 0;
  vreten2 = newMeshes[0];
});

scene.registerBeforeRender(function () {
  vreten.rotate(Axis.Y, 0.1, Space.WORLD);
  vreten2.rotate(Axis.Y, 0.1, Space.WORLD);
});

engine.runRenderLoop(function () {
  scene.render();
});
const environment1 = scene.createDefaultEnvironment({
  enableGroundShadow: true
});
