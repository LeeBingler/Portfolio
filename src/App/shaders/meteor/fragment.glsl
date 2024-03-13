uniform float uTime;

varying vec2 vUv;

#include ../includes/simplexNoise3d.glsl

// cosine based palette, 4 vec3 params
vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    float speedNoiseSpin = uTime * 2.5;
    float speedDropDown = uTime * 2.0;

    float noise = snoise3d(vec3(vUv.x * 5.0 + speedNoiseSpin, vUv.y + speedDropDown, uTime * 0.3) * 1.5);

    // smoothEdge
    noise *= smoothstep(0.0, 1.0, vUv.y);
    noise *= 5.0;

    // Color
    float colorTime = step(0.5, mod(vUv.x + uTime, 0.6));
    vec3 colorA = vec3(1.0, 0.0, 0.0); // contrast
    vec3 colorB = vec3(0.0, 0.0, 0.0); // brigthness
    vec3 colorC = vec3(1.0, 1.0, 1.0);

    vec3 color = mix(colorA, colorB, colorTime);

    gl_FragColor = vec4(vec3(color), noise);
    gl_FragColor = vec4(vec3(color), 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
