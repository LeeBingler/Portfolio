uniform float uTime;

varying vec2 vUv;

#include ../includes/simplexNoise2d.glsl

void main() {
    vec3 newPosition = position;
    vec2 newUv = uv;
    newUv.x += uTime * 0.1;

    float noisePattern = smoothstep(0.1, 0.8, snoise(newUv * 10.0));
    newPosition = newPosition + normal * noisePattern * 0.2;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // varying
    vUv = newUv;
}