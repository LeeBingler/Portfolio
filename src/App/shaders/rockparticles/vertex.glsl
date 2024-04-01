attribute float aRandomScale;
attribute float aTimeMultiplier;

varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

float easeOutCubic(float x) {
    return 1.0 - pow(1.0 - x, 3.0);
}

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax) {
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main() {
    float particlesProgress = uProgress * aTimeMultiplier;
    vec3 newPosition = position;

    // Explosion
    float explosionAnim = remap(particlesProgress, 0.0, 0.1, 0.0, 1.0);
    explosionAnim = min(1.0, explosionAnim);
    explosionAnim = easeOutCubic(explosionAnim);
    newPosition *= explosionAnim;

    // Falling
    float fallAnime = remap(particlesProgress, 0.1, 1.0, 0.0, 1.0);
    fallAnime = min(1.0, fallAnime);
    fallAnime = easeOutCubic(fallAnime);
    newPosition.y -= fallAnime * 0.2;

    // Scaling
    float sizeOpeningProgress = remap(particlesProgress, 0.0, 0.125, 0.0, 1.0);
    float sizeClosingProgress = remap(particlesProgress, 0.125, 1.0, 1.0, 0.0);
    float sizeProgress = min(sizeClosingProgress, sizeOpeningProgress);

    // Twinkling
    float twinkleProgress = remap(particlesProgress, 0.2, 0.8, 0.0, 1.0);
    twinkleProgress = min(1.0, twinkleProgress);

    float sizeTwinkle = sin(particlesProgress * 30.0) * 0.5 + 0.5;
    sizeTwinkle = 1.0 - sizeTwinkle * twinkleProgress;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;

    gl_Position = projectionMatrix * viewPosition;

    // varying
    vUv = uv;
    vPosition = modelPosition.xyz;

    gl_PointSize = uSize * uResolution.y * aRandomScale * sizeProgress * sizeTwinkle;

    gl_PointSize *= 1.0 / -viewPosition.z;


    if (gl_PointSize <= 1.0) {
        gl_Position = vec4(9999.0);
    }
}
