varying vec2 vUv;

uniform float uTime;
uniform vec3 uColorIn;
uniform vec3 uColorOut;


#include ../includes/simplexNoise3d.glsl;

void main() {
    // diplace the uv
    vec2 displaceduv = vUv * snoise3d(vec3(vUv * 5.0, uTime * 0.1));

    // simplex noise
    float strength = snoise3d(vec3(displaceduv * 5.0, uTime * 0.2));

    // outer glow
    float outerglow = distance(vUv, vec2(0.5)) * 5.0 - 1.5;
    strength += outerglow;

    // step apply to sharpened the pattern
    strength += step(-1.2, strength) * 0.8;

    // clamp strenght
    strength = clamp(strength, 0.0, 1.0);

    // final color
    vec3 color = mix(uColorIn, uColorOut, strength);

    gl_FragColor = vec4(color, 1.0);
}
