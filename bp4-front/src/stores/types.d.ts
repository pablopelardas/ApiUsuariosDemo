export interface AuthState {
  account: Account | null
  token: string | null
}

export interface AppState {
  loading: boolean
  error: string | null
}

export interface UsersState {
  users: User[]
}
