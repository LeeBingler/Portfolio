uniform sampler2D uTexture;
uniform vec2 uTouch;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    // make the texture shape for the plane
    float alpha = texture(uTexture, vUv).r * -1.0 + 1.0;
    
    // make the fragment disappear when mouse on it
    vec2 touchPosition = vec2(uTouch.x, uTouch.y - 1.0);
    float pattern = distance(vPosition.xy, touchPosition);
    pattern = step(0.25, pattern);


    alpha *= pattern;

    gl_FragColor = vec4(vec3(1.0), alpha);
}
