import { useLocation, useNavigate } from 'react-router-dom'
import { LoginType } from "@/types/login/loginType";
import { AuthStatus } from "@/types/slices/authType";
import { LocalStorageKey } from "@/types/local-st/localStorage";
import { readLocalStorage, saveLocalStorage } from "@/toolbox/helpers";
import { AuthAPI } from '@/apis/AuthAPI';
import { useAuthActions, useAuthErrorMessage, useAuthStatus, useAuthUser } from '@/zustand/authStore';
import { ProfileAPI } from '@/apis/ProfileAPI';
import toast from 'react-hot-toast';
import { RoutesMap } from '@/types';

export const useAuthStore = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const user = useAuthUser();
  const status = useAuthStatus();
  const errorMessage = useAuthErrorMessage();
  const { onLogin, onLogout, onRefreshToken, clearErrorMessage, onChangeAuthStatus, onVerifying} = useAuthActions()

  const setProfileData = async (access_token: string, rut_company: string) => {
    try {
      const perfil = await ProfileAPI.get(access_token, rut_company)
      const { detail } = perfil
      saveLocalStorage(LocalStorageKey.DATA_USER, detail)
      onLogin(detail)
      return detail
    } catch (error) {
      console.error(error)
    }
  }

  const login = async ({ user_name, password, rut }: LoginType) => {
    try {
      const login = await AuthAPI.login(user_name, password, rut)
      if (!login?.detail?.access_token) {
        throw new Error()
      }
      const { access_token } = login?.detail
      saveLocalStorage(LocalStorageKey.TOKEN_JWT, {access_token, rut_company: rut, encript:''})
      const detail = await setProfileData(access_token, rut)
      toast.success('Bienvenido')
      return {
        status: true,
        detail
      }

    } catch (error) {
      onLogout('Credenciales Incorrectas')
      toast.error('Credenciales Incorrectas')
      setTimeout(() => {
        clearErrorMessage();

      }, 500)
      return {
        status: false,
        detail: {}
      }
    }
  }

  // const verifySession = async () => {
  //  onVerifying();
  //   const token:any = readLocalStorage(LocalStorageKey.TOKEN_JWT)
  //   if (!token?.access_token) return logout()
  //   try {
  //     const isTokenValid = await AuthAPI.verifyToken(token?.access_token)
  //     if (isTokenValid && !isTokenValid?.status) {
  //       console.log('user', user);
  //       await setProfileData(token?.access_token, token?.rut_company)
  //       onChangeAuthStatus(AuthStatus.AUTHENTICATED);
  //       navigate({ pathname: location.pathname })
  //       return true
  //     } else {
  //       // await refreshToken(token?.access_token, token?.rut_company)
  //       return logout()
  //     }
  //     localStorage.clear()
  //     onLogout(undefined);
  //     toast.error('Su sesión expiró')
  //   } catch (error) {
  //     toast.error('Su sesión expiró')
  //     localStorage.clear()
  //     onLogout(undefined);
  //   }
  // }

  const verifySession = async () => {
    onVerifying();
     const token:any = readLocalStorage(LocalStorageKey.TOKEN_JWT)
     if (!token?.access_token) return logout()
     try {
       const isTokenValid = await AuthAPI.verifyToken(token?.access_token)
       if (isTokenValid && !isTokenValid?.status) {
         await setProfileData(token?.access_token, token?.rut_company)
         onChangeAuthStatus(AuthStatus.AUTHENTICATED);
         navigate({ pathname: location.pathname })
         return
       } else {
         await refreshToken(token?.access_token, token?.rut_company)
       }
       localStorage.clear()
       onLogout(undefined);
       toast.error('Su sesión expiró')
     } catch (error) {
       toast.error('Su sesión expiró')
       localStorage.clear()
       onLogout(undefined);
     }
   }

  const refreshToken = async (token: string, rut_company: string) => {
    try {
      const session = await AuthAPI.refresh(token)
      console.log('session', session)
      if (!session?.authorisation?.token) {
        localStorage.clear()
        onLogout(undefined);
        toast.error('Su sesión expiró')
      } else {
        const { token } = session.authorisation
        await setProfileData(token, rut_company)
        saveLocalStorage(LocalStorageKey.TOKEN_JWT, {token, encript: ''})
        onRefreshToken(session.user)
        navigate({ pathname: location.pathname })
      }
    } catch (error) {
      console.error('[Error whilte refreshing token]', error)
    }
  }

  const logout = async () => {
    try {
      await AuthAPI.logout()
      localStorage.clear()
      onLogout(undefined);
      navigate({ pathname: RoutesMap.HOME })
    } catch (error) {
      console.error(error)
    }

  }

  const getImageSource = (): string => {
    // if (user?.data?.photo) {
    //   return `${import.meta.env.VITE_APP_ROOT_URL}/${user.data.photo}`
    // }

    return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  }

  const RecoveryPassword = async (perfil: number, rut: string, email?:string) => {
    try {
      if (!rut) { return toast.error('Ingrese el rut') }
      const response = await AuthAPI.recoveryPass(perfil, rut, email)
      if (response?.code === 400) {
        toast.error(response?.data?.message)
        return false
      }
      toast.success(response?.data?.message)
      return true;
    } catch (error) {
      console.error('[Error whilte refreshing token]', error)
    }
  }


  return {
    //states
    status,
    user,
    errorMessage,
    //actions
    login,
    logout,
    verifySession,
    setProfileData,
    getImageSource,
    RecoveryPassword,
  }
}
