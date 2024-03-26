varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec3 normal = normalize(vNormal);

    vec3 color = vec3(1.0, 0.0, 0.0);

    vec3 viewPosition = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewPosition, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    float halo = step(0.3, fresnel);
    float falloffEdge = smoothstep(0.7, 0.0, fresnel);
    halo *= falloffEdge;

    gl_FragColor = vec4(color, halo);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
