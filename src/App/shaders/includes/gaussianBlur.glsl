// Gaussian Blur 
// Created by existical in 2018-10-23
// Function From : https://www.shadertoy.com/view/Xltfzj

vec4 gaussianBlur(float direction, float quality, float size, sampler2D image, vec2 uv, vec2 resolution) {
    float TAU = 6.28318530718; // PI * 2
    vec4 color = texture2D(image, uv);
    vec2 radius = size / resolution.xy;

    for (float d = 0.0; d < TAU; d += TAU / direction) {
        for (float i = 1.0 / quality; i <= 1.0; i += 1.0 / quality) {
            color += texture2D(image, uv + vec2(cos(d), sin(i)) * radius * i);
        }
    }
    
    color /= quality * direction - 15.0;

    return color ;
}

