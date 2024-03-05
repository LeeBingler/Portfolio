uniform vec3 uColor;

varying vec2 vUv;

void main() {
    float pattern = 1.0 - length(gl_PointCoord - 0.5);
    pattern = pow(pattern, 5.0);

    vec3 color = uColor;

    gl_FragColor = vec4(color, pattern);
}