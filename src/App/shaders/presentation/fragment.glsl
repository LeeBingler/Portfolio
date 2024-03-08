uniform sampler2D uTexture;
uniform sampler2D uTouchTexture;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    // make the texture shape for the plane
    float alpha = texture(uTexture, vUv).r;
    alpha = alpha * -1.0 + 1.0;

    // make trail out of the canvas texture
    float trail = texture(uTouchTexture, vUv).r * 2.0;
    trail = trail * -1.0 + 1.0;

    alpha *= trail;

    gl_FragColor = vec4(vec3(1.0), alpha);
}
