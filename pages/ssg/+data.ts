// Note:
// - In dev, this value is stable until the server reloads (HMR / restart).
// - In production with prerendering enabled, this becomes the build-time stamp.
const buildTime = new Date().toISOString()

export function data() {
  return { buildTime }
}
