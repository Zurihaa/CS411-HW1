var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // Four Vertices
    var vertices = [
        vec2( -0.5, -0.5 ),
        vec2( -0.5,  0.5 ),
        vec2(  0.5,  0.5 ),
        vec2(  0.5, -0.5)
    ];

    // Define colors and opacity for each vertex
    var colors = [
        vec4(1.0, 0.0, 0.0, 1.0), // Red
        vec4(0.0, 1.0, 0.0, 0.7), // Green with 70% opacity
        vec4(0.0, 0.0, 1.0, 0.5), // Blue with 50% opacity
        vec4(1.0, 1.0, 0.0, 0.8)  // Yellow with 80% opacity
    ];

    // Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    // Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU for vertices
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate our shader variables with the data buffers
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Load the data into the GPU for colors
    var colorBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    // Associate our shader variables with the color buffer
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.enableVertexAttribArray( vColor );
    gl.bindBuffer( gl.ARRAY_BUFFER, colorBufferId );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

