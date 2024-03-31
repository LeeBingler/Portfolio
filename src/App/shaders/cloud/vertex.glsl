uniform float uTime;

varying vec2 vUv;

void main() {
    vec3 newPosition = position;
    newPosition.x += sin(uTime * 0.2) * 0.5;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // varying
    vUv = uv;
}
