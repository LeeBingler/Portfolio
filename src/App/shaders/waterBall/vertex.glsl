uniform float uTime;
uniform float uFrequenceNoise;
uniform float uStrengthDisplacement;

varying vec2 vUv;

void main() {
    vec3 newPosition = position;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // varying
    vUv = uv;
}
