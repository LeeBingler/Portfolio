uniform float uTime;
uniform float uFrequenceNoise;
uniform float uStrengthDisplacement;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

#include ../includes/simplexNoise3d.glsl

void main() {
    vec3 newPosition = position;

    float noisePattern = smoothstep(0.1, 0.8, snoise3d(vec3(uv.xy, uTime * 0.1) * uFrequenceNoise));
    newPosition = newPosition + normal * noisePattern * uStrengthDisplacement;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vec4 normalMatrix = modelMatrix * vec4(normal, 0.0);

    // varying
    vUv = uv;
    vNormal = normalMatrix.xyz;
    vPosition = modelPosition.xyz;
}
