import { defineStore } from 'pinia'
import { darkTheme, lightTheme } from 'naive-ui'

export const useTheme = defineStore('theme', {
  state: () => ({
    /* system theme */
    theme: 'lightTheme',
    primaryColor: '#18a058',

    /* naive ui theme */

    /* charts theme */
    themeEcahrts: ''
  }),

  getters: {
    /* system theme  */
    // 是否浅色主题
    isLightTheme: (state) => state.theme === 'lightTheme',
    // 是否深色主题
    isDarkTheme: (state) => state.theme === 'darkTheme',

    /* naive ui */
    // 请参考： https://www.naiveui.com/zh-CN/os-theme/docs/customize-theme
    // naive ui 主题随系统主题变化
    naiveTheme: (state) => (state.theme === 'darkTheme' ? darkTheme : lightTheme),
    // naive ui 主题变量随系统主题变化
    naiveThemeOverrides: (state) => {
      return {
        common: {
          primaryColor: state.primaryColor
        }
      }
    },

    /* eCharts theme */
    eChartsTheme: (state) => (state.theme === 'darkTheme' ? 'dark' : 'light')
  },

  actions: {
    toggleTheme() {
      this.theme = this.isLightTheme ? 'darkTheme' : 'lightTheme'

      // 添加 dark class，以支持 tailwind 深色主题
      // https://tailwindcss.com/docs/dark-mode
      if (this.isLightTheme) {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      }
    }
  }
})