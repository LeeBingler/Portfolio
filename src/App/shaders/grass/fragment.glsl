varying vec2 vUv;
varying vec2 vWindUV;

uniform sampler2D uPerlin;
uniform float uTime;

void main() {
    float noise = texture2D(uPerlin, vWindUV).r;

    vec3 color = mix(vec3(0.0, 0.6, 0.0), vec3(0.0, 1.0, 0.0), noise);
    gl_FragColor = vec4(color, 1.0);
}
