import { ConeGeometry } from '../src/types';

export const computeCone = (
  height: number,
  radius: number,
  segments: number
): ConeGeometry => {
  const vertices: number[][] = [];
  const faces: number[][] = [];
  const normals: number[][] = [];

  for (let i = 0; i < segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    const z = 0;
    vertices.push([x, y, z]);

    faces.push([i, (i + 1) % segments, segments]);
    faces.push([i, segments + 1, (i + 1) % segments]);
  }

  vertices.push([0, 0, height]);
  vertices.push([0, 0, 0]);

  vertices.forEach((vertex) => {
    const B = { x: 0, y: 0, z: -(radius * radius) / height };
    const Ni = {
      x: vertex[0] - B.x,
      y: vertex[1] - B.y,
      z: vertex[2] - B.z,
    };
    const length = Math.sqrt(Ni.x * Ni.x + Ni.y * Ni.y + Ni.z * Ni.z);

    normals.push([Ni.x / length, Ni.y / length, Ni.z / length]);
  });

  return {
    vertices: vertices.flat(),
    faces: faces.flat(),
    normals: normals.flat(),
  };
};
