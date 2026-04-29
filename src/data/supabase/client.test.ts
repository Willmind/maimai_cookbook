import { describe, expect, it } from 'vitest'

import { readSupabaseConfig } from './client'

describe('readSupabaseConfig', () => {
  it('returns Supabase URL and anon key when both are configured', () => {
    expect(
      readSupabaseConfig({
        VITE_SUPABASE_URL: 'https://example.supabase.co',
        VITE_SUPABASE_ANON_KEY: 'anon-key',
      }),
    ).toEqual({
      url: 'https://example.supabase.co',
      anonKey: 'anon-key',
    })
  })

  it('throws a clear setup error when config is missing', () => {
    expect(() => readSupabaseConfig({})).toThrow(
      'Supabase mode requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    )
  })
})
