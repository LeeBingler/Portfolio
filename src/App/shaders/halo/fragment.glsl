varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec3 normal = normalize(vNormal);

    vec3 color = vec3(1.0, 0.0, 0.0);

    vec3 viewPosition = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewPosition, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    float halo = smoothstep(0.0, 0.8, fresnel);

    gl_FragColor = vec4(color, halo);
}