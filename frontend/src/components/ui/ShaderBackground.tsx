'use client';

import { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL Initialization
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source (using u_mouse to add smooth mouse-reactive dynamics)
    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          
          // Theme Colors
          vec3 color1 = vec3(0.0, 0.40, 0.45); // Teal #006672
          vec3 color2 = vec3(0.40, 0.84, 0.91); // Light Teal #65d6e9
          vec3 color3 = vec3(0.98, 0.89, 0.29); // Yellow #fbe449
          
          float t = u_time * 0.4;
          
          // Normalize mouse coordinates [0, 1]
          vec2 mouse = u_mouse / u_resolution;
          
          // Dynamic coordinates influenced by mouse
          float n1 = sin(uv.x * 3.0 + t + sin(uv.y * 2.0 + t) + mouse.x * 2.0) * 0.5 + 0.5;
          float n2 = cos(uv.y * 4.0 - t + cos(uv.x * 3.0 - t) + mouse.y * 2.0) * 0.5 + 0.5;
          float n3 = sin((uv.x + uv.y) * 2.0 + t * 0.5 + (mouse.x + mouse.y)) * 0.5 + 0.5;
          
          vec3 finalColor = mix(color1, color2, n1);
          finalColor = mix(finalColor, color3, n2 * 0.5);
          finalColor = mix(finalColor, vec3(1.0), n3 * 0.2);
          
          float pulse = sin(u_time * 0.5) * 0.1 + 0.9;
          finalColor *= pulse;

          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Shader Compile Helper
    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering canvas)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations
    const uTimeLocation = gl.getUniformLocation(program, 'u_time');
    const uResLocation = gl.getUniformLocation(program, 'u_resolution');
    const uMouseLocation = gl.getUniformLocation(program, 'u_mouse');

    let mouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1.0 - (e.clientY - rect.top) / rect.height; // WebGL uses bottom-left origin
      mouse.x = nx * canvas.width;
      mouse.y = ny * canvas.height;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize Observer to handle canvas sizing
    const resizeCanvas = () => {
      const width = canvas.clientWidth || 800;
      const height = canvas.clientHeight || 600;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => resizeCanvas());
      resizeObserver.observe(canvas);
    }
    resizeCanvas();

    let animationId: number;
    const render = (time: number) => {
      // If WebGL context is lost, stop rendering
      if (gl.isContextLost && gl.isContextLost()) return;

      resizeCanvas();
      
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);

      if (uTimeLocation) gl.uniform1f(uTimeLocation, time * 0.001);
      if (uResLocation) gl.uniform2f(uResLocation, canvas.width, canvas.height);
      if (uMouseLocation) gl.uniform2f(uMouseLocation, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      cancelAnimationFrame(animationId);
      
      // Clean up buffers and programs
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block touch-none pointer-events-none md:pointer-events-auto"
      style={{ display: 'block' }}
    />
  );
}
