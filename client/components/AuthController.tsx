import useLocalStorageTokens from '@/client/hooks/useLocalStorageTokens'

const AuthController = () => {
  useLocalStorageTokens();

  return null
}

export default AuthController
