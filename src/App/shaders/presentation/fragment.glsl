uniform sampler2D uTexture;
uniform vec2 uTouch;

varying vec2 vUv;

void main() {
    float alpha = texture(uTexture, vUv).r * -1.0 + 1.0;
    alpha = 1.0;
    gl_FragColor = vec4(uTouch, 1.0, alpha);
}
