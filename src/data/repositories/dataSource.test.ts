import { describe, expect, it } from 'vitest'

import { resolveDataSource } from './dataSource'

describe('resolveDataSource', () => {
  it('uses mock as the default data source', () => {
    expect(resolveDataSource({})).toBe('mock')
  })

  it('supports explicit Supabase mode', () => {
    expect(resolveDataSource({ VITE_DATA_SOURCE: 'supabase' })).toBe('supabase')
  })

  it('forces mock mode during tests even when local env selects Supabase', () => {
    expect(resolveDataSource({ MODE: 'test', VITE_DATA_SOURCE: 'supabase' })).toBe('mock')
  })

  it('rejects unsupported data source values', () => {
    expect(() => resolveDataSource({ VITE_DATA_SOURCE: 'local-storage' })).toThrow(
      'Unsupported VITE_DATA_SOURCE "local-storage"',
    )
  })
})
