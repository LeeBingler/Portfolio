varying vec2 vUv;

uniform vec3 uColorA;
uniform vec3 uColorB;

#include ../includes/simplexNoise2d.glsl

void main() {
    float noisePattern = smoothstep(0.1, 0.8, snoise(vUv * 10.0));
    vec3 color = mix(uColorB, uColorA, noisePattern);

    gl_FragColor = vec4(color, 1.0);
}