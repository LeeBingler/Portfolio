uniform sampler2D uTextureMix;
uniform sampler2D uTextureScene1;
uniform sampler2D uTextureScene2;
uniform float uTransition;
uniform float uThreshold;

varying vec2 vUv;

void main() {
    vec4 textureScene1 = texture2D(uTextureScene1, vUv);
    vec4 textureScene2 = texture2D(uTextureScene2, vUv);

    // Transition
    float threshold = uThreshold;
    float mixTexture = texture2D(uTextureMix, vUv + uTransition * 0.1).r;
    float r = uTransition * (1.0 + threshold * 2.0) - threshold;
    float mixf = clamp((mixTexture - r) * (1.0/threshold), 0.0, 1.0);
    vec4 finalTexture = mix(textureScene2, textureScene1, mixf);

    // texture transition
    gl_FragColor = finalTexture;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
