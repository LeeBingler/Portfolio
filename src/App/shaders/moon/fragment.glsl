varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
uniform float uFrequenceNoise;

#include ../includes/simplexNoise3d.glsl

void main() {
    vec3 normal = normalize(vNormal);

    float noisePattern = smoothstep(0.1, 0.8, snoise3d(vec3(vUv.xy, uTime * 0.1) * uFrequenceNoise));
    vec3 color = mix(uColorB, uColorA, noisePattern);

    // More realistic render
    vec3 viewPosition = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewPosition, normal) + 1.0;
    fresnel = pow(fresnel, 3.0);
    fresnel = smoothstep(1.0, 0.0, fresnel);

    gl_FragColor = vec4(color * fresnel, 1.0);
}
