uniform float uSize;
uniform float uTime;
uniform float uFrequenceTwinkling;

attribute float aRandomScale;
attribute float aRandomTime;

varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // Twinkling
    float sizeTwinkle = sin(uTime * aRandomTime * uFrequenceTwinkling) * 0.2 + 1.0;

    gl_PointSize = uSize * aRandomScale * sizeTwinkle;
    gl_PointSize *= 1.0 / -viewPosition.z;

    // varying
    vUv = uv;
}
