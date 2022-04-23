import useLocalStorageTokens from '@/client/hooks/useLocalStorageTokens'
import useLogoutTimeout from '@/client/hooks/useLogoutTimeout';

const AuthController = () => {
  useLocalStorageTokens();
  useLogoutTimeout()

  return null
}

export default AuthController
