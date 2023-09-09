import { createRef, useEffect } from 'react';
import { ConeGeometry } from '../../types';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export const Cone = ({ vertices, faces, normals }: ConeGeometry) => {
  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 15;
      scene.background = new THREE.Color(0x242424);

      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(window.innerWidth, window.innerHeight);
      const controls = new OrbitControls(camera, renderer.domElement);

      const dl = new THREE.DirectionalLight(0x75cdff, 1);
      dl.position.set(3, 0, 3);
      scene.add(dl);

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      geometry.setAttribute(
        'normal',
        new THREE.Float32BufferAttribute(normals, 3)
      );
      geometry.setIndex(faces);

      const material = new THREE.MeshPhongMaterial({
        emissive: 0xc12525,
      });
      const mesh = new THREE.Mesh(geometry, material);

      scene.add(mesh);

      mesh.rotation.x = -0.6;
      mesh.rotation.y = 0.2;

      const animate = () => {
        const animation = requestAnimationFrame(animate);

        mesh.rotation.z += 0.01;
        controls.update();
        renderer.render(scene, camera);

        return animation;
      };

      const animation = animate();

      return () => {
        scene.remove(dl);
        scene.remove(mesh);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        cancelAnimationFrame(animation);
      };
    }
  }, [vertices, faces]);

  return <canvas ref={canvasRef} />;
};
