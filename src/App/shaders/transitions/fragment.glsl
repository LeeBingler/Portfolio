uniform sampler2D uTextureMix;
uniform sampler2D uTextureScene1;
uniform sampler2D uTextureScene2;
uniform float uTransition;
uniform float uThreshold;

varying vec2 vUv;

void main() {
    vec3 textureScene1 = texture2D(uTextureScene1, vUv).rgb;
    vec3 textureScene2 = texture2D(uTextureScene2, vUv).rgb;

    // basic transition
    vec3 finalTexture = mix(textureScene1, textureScene2, uTransition);

    float threshold = uThreshold;
    float mixTexture = texture2D(uTextureMix, vUv + uTransition * 0.1).r;
    float r = uTransition * (1.0 + threshold * 2.0) - threshold;
    float mixf = clamp((mixTexture - r) * (1.0/threshold), 0.0, 1.0);
    finalTexture = mix(textureScene1, textureScene2, mixf);

    // texture transition
    gl_FragColor = vec4(finalTexture, 1.0);
}
