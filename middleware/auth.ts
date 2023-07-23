import isSuccess from '~/helpers/is-success'
import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { actions, state } = useUserStore()
  if (to.path === to.redirectedFrom?.path) {
    return abortNavigation()
  }
  switch (to.path) {
    case '/dating': {
      const { $api } = useNuxtApp()
      const resp = await $api.auth.verifyLogin()
      if (!isSuccess(resp)) {
        return navigateTo('/login')
      }
      actions.setUser(resp.data.user)
      
      return
    
    }
    case '/settings': {
	console.log('redireeeect')
      const { $api } = useNuxtApp()
      const resp = await $api.auth.verifyLogin()
      if (!isSuccess(resp)) {
        return navigateTo('/login')
      }
      actions.setUser(resp.data.user)
      
      return
    	
    }

    case '/' : {
      const { $api } = useNuxtApp()
      const resp = await $api.auth.verifyLogin()
      if (isSuccess(resp)) {
        console.log(resp)
        actions.setUser(resp.data.user)
      }
      console.log(state.user)
      
      return
    }
  }
})
