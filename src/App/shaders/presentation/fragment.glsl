uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
    float alpha = texture(uTexture, vUv).r * -1.0 + 1.0;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}
