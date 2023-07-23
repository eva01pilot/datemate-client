import { defineStore } from 'pinia'

export type theme = 'latte' | 'macchiato' | 'mocha' | 'frappe';

export const useThemeStore = defineStore('theme-store', () => {
  const state = reactive<{
    theme: theme
  }>({ theme: 'latte' })

  const getters = {
    theme () {
      return state.theme
    }
  }

  const actions = {
    setTheme (theme: theme) {
      // eslint-disable-next-line no-console
      console.log('prev', state.theme)
      state.theme = theme
      // eslint-disable-next-line no-console
      console.log('after', state.theme)
    }
  }

  return { state, getters, actions }
})
