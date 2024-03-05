uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

#include ../includes/simplexNoise2d.glsl

void main() {
    vec3 newPosition = position;
    vec2 newUv = uv;
    newUv.x += uTime * 0.1;

    float noisePattern = smoothstep(0.1, 0.8, snoise(newUv * 10.0));
    newPosition = newPosition + normal * noisePattern * 0.2;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vec4 normalMatrix = modelMatrix * vec4(normal, 0.0);

    // varying
    vUv = newUv;
    vNormal = normalMatrix.xyz;
    vPosition = modelPosition.xyz;
}