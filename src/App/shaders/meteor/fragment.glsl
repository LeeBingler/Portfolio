uniform float uTime;
uniform float uSpeedNoiseSpin;
uniform float uSpeedNoiseDropDown;
uniform float uFrequenceNoise;
uniform vec3 uColor;

varying vec2 vUv;

#include ../includes/simplexNoise3d.glsl

// cosine based palette, 4 vec3 params
vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    float speedNoiseSpin = uTime * uSpeedNoiseSpin;
    float speedDropDown = uTime * uSpeedNoiseDropDown;

    float noise = snoise3d(vec3(vUv.x * 5.0 + speedNoiseSpin, vUv.y + speedDropDown, uTime * 0.3) * uFrequenceNoise);

    // smoothEdge
    noise *= smoothstep(0.0, 0.5, vUv.y);
    noise *= 2.0;


    vec3 color = uColor; 
    color *= vUv.y * 2.0;

    gl_FragColor = vec4(vec3(color), noise);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
