type RateLimitEntry = {
  count: number
  resetAt: number
}

export type RateLimitResult = {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
  retryAfterSeconds: number
}

export type RateLimitOptions = {
  limit: number
  windowMs: number
  now?: number
}

const buckets = new Map<string, RateLimitEntry>()

function pruneExpired(now: number) {
  if (buckets.size < 1000) return
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key)
  }
}

export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = options.now ?? Date.now()
  const limit = Math.max(1, Math.floor(options.limit))
  const windowMs = Math.max(1000, Math.floor(options.windowMs))
  pruneExpired(now)

  const existing = buckets.get(key)
  const entry = !existing || existing.resetAt <= now
    ? { count: 0, resetAt: now + windowMs }
    : existing

  entry.count += 1
  buckets.set(key, entry)

  const retryAfterSeconds = Math.max(0, Math.ceil((entry.resetAt - now) / 1000))
  return {
    allowed: entry.count <= limit,
    limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
    retryAfterSeconds,
  }
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return (
    headers.get('cf-connecting-ip')?.trim() ||
    headers.get('x-real-ip')?.trim() ||
    forwardedFor ||
    'unknown'
  )
}

export function resetRateLimit(key?: string): void {
  if (key) {
    buckets.delete(key)
    return
  }
  buckets.clear()
}
