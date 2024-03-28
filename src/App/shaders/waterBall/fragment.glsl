varying vec2 vUv;

uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
uniform float uFrequenceNoise;

void main() {
    vec3 color = mix(uColorB, uColorA, vUv.y * 2.0);

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
