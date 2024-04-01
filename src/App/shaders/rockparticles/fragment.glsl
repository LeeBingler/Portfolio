varying vec2 vUv;
varying vec3 vPosition;

uniform vec3 uColor;
uniform float uProgress;

void main() {
    float pattern = 1.0 - length(gl_PointCoord - 0.5);
    pattern = pow(pattern, 7.0);

    gl_FragColor = vec4(uColor, pattern);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
