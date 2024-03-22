attribute vec3 aPositionBlade;
attribute float aAngle;
attribute float aHeigth;

uniform float uTime;
uniform sampler2D uPerlin;

varying vec2 vUv;
varying vec2 vWindUV;

vec4 quat_from_axis_angle(vec3 axis, float angle) {
    vec4 qr;
    float half_angle = (angle * 0.5) * 3.14159 / 180.0;
    qr.x = axis.x * sin(half_angle);
    qr.y = axis.y * sin(half_angle);
    qr.z = axis.z * sin(half_angle);
    qr.w = cos(half_angle);
    return qr;
}

vec3 rotate_vertex_position(vec3 position, vec3 axis, float angle) {

    vec4 q = quat_from_axis_angle(axis, angle);
    vec3 v = position.xyz;
    return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);

}

void main() {
    vec3 newPosition = position;

    // height variation of the blade
    newPosition.y *= aHeigth;

    // rotation of the blade
    vec3 axisY = vec3(0.0, 1.0, 0.0);
    newPosition = rotate_vertex_position(newPosition, axisY, aAngle);


    // set position on the field
    newPosition += aPositionBlade;

    // animation wind
    vec2 windUV = vec2(aPositionBlade.x, aPositionBlade.z) / 2.0;
    windUV.x += uTime * 0.1;
    windUV.y += cos(uTime) * 0.1;

    float strengthWind = texture2D(uPerlin, windUV).r; 
    strengthWind *= 0.1 * uv.y;

    newPosition.x -= strengthWind;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    gl_Position = projectionMatrix * viewMatrix * modelPosition;


    // varying
    vUv = uv;
    vWindUV = windUV;
}
