varying vec2 vUv;
varying vec2 vWindUV;

uniform sampler2D uPerlin;
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;

void main() {
    float noise = texture2D(uPerlin, vWindUV).r;

    vec3 color = mix(uColorA, uColorB, vUv.y);
    color -= noise * 0.3;

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
