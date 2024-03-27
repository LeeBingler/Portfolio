uniform vec3 uColor;

void main() {
    float pattern = 1.0 - length(gl_PointCoord - 0.5);
    pattern = pow(pattern, 7.0);

    vec3 color = uColor * pattern;

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
