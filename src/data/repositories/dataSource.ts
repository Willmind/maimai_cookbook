export type DataSource = 'mock' | 'supabase'

export interface DataSourceEnv {
  readonly MODE?: string
  readonly VITE_DATA_SOURCE?: string
}

export function resolveDataSource(env: DataSourceEnv = import.meta.env): DataSource {
  if (env.MODE === 'test') {
    return 'mock'
  }

  const value = env.VITE_DATA_SOURCE?.trim().toLowerCase() || 'mock'

  if (value === 'mock' || value === 'supabase') {
    return value
  }

  throw new Error(`Unsupported VITE_DATA_SOURCE "${env.VITE_DATA_SOURCE}". Use "mock" or "supabase".`)
}
