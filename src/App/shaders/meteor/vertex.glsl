varying vec2 vUv;

uniform float uTime;
uniform sampler2D uPerlinTexture;

vec2 rotate2D(vec2 value, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}

void main() {
    vec3 newPosition = position;

    vec2 move = vec2(
        texture(uPerlinTexture, vec2(0.4, uTime * 0.2)).r - 0.5,
        texture(uPerlinTexture, vec2(0.1, uTime * 0.2)).r - 0.5
    );

    move *= pow(1.0 - uv.y, 1.5);
    newPosition.xz += move;
 
    newPosition.x -= sin(uv.y * 10.0 + uTime * 10.0) * 0.01;
    newPosition.z += cos(uv.y * 10.0 + uTime * 10.0) * 0.01;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
    
    // varying
    vUv = uv;
}
