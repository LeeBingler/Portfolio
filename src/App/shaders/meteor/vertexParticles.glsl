attribute float aScale;
attribute float aRandom;
attribute float aTimeMultiplier;

uniform float uSize;
uniform vec2 uResolution;
uniform vec3 uFinalDirection;
uniform float uTime;
uniform float uSpeed;


float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax) {
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main() {
    float progress = mod(uTime * aTimeMultiplier * uSpeed, 1.0);
    vec3 direction = vec3(0.0, 0.9, 0.0) - normalize(uFinalDirection) * aRandom;

    vec3 newPosition = position + direction * progress;
    
    // Twinkling
    float twinkleProgress = remap(progress, 0.2, 0.8, 0.0, 1.0);
    twinkleProgress = min(1.0, twinkleProgress);
    float sizeTwinkle = sin(progress * 30.0) * 0.5 + 0.5;
    sizeTwinkle = 1.0 - sizeTwinkle * twinkleProgress;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);

    gl_PointSize = uSize * aScale * uResolution.y * sizeTwinkle;
}
