varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform vec3 uColorA;
uniform vec3 uColorB;

#include ../includes/simplexNoise2d.glsl

void main() {
    vec3 normal = normalize(vNormal);

    float noisePattern = smoothstep(0.1, 0.8, snoise(vUv * 10.0));
    vec3 color = mix(uColorB, uColorA, noisePattern);

    // More realistic render
    vec3 viewPosition = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewPosition, normal) + 1.0;
    fresnel = pow(fresnel, 3.0);
    fresnel = smoothstep(1.0, 0.0, fresnel);

    gl_FragColor = vec4(color * fresnel, 1.0);
}