uniform sampler2D uTexture;
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
uniform float uTime;

varying vec2 vUv;

void main() {
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = smoothstep( fogNear, fogFar, depth );

    // animation
    vec2 uv = vUv;
    uv.y += cos(uTime * 0.25) * 0.05;
    uv.x += sin(uTime * 0.2) * 0.07;

    gl_FragColor = texture2D( uTexture, uv );
    gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
    gl_FragColor = mix( gl_FragColor, vec4( fogColor , gl_FragColor.w ), fogFactor );
}
