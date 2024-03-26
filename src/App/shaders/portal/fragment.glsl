varying vec2 vUv;

uniform float uTime;
uniform vec3 uColorIn;
uniform vec3 uColorOut;

uniform sampler2D uImage;
uniform float uProgress;
uniform vec2 uResolution;

#include ../includes/simplexNoise3d.glsl;
#include ../includes/gaussianBlur.glsl

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

    // image movement
    vec2 uvImage = vec2(vUv.y, vUv.x);
    uvImage.x += sin(uProgress * 10.0) * 0.002;
    uvImage.y -= cos(uProgress * 10.0) * 0.002;
    
    // image
    vec3 image = gaussianBlur(
                    16.0,
                    4.0,
                    10.0,
                    uImage,
                    uvImage,
                    uResolution
                ).rgb;

    // In Color
    vec3 inColor = mix(uColorIn, image, sin(uProgress * 3.15));

    // final color
    vec3 color = mix(inColor, uColorOut, strength);

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
