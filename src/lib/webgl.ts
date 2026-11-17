export function releaseWebGLContext(
  canvas: HTMLCanvasElement | null | undefined,
  gl: WebGL2RenderingContext
) {
  if (!canvas) return

  const release = () => {
    if (!canvas.isConnected) {
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }

  if (canvas.isConnected) {
    queueMicrotask(release)
    return
  }

  release()
}
