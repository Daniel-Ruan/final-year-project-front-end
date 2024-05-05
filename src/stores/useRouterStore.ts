import { defineStore } from "pinia"

type RouterStore = {
    nextRoute: string,
    setNextRoute: (path: string) => void
    getNextRoute: () => string
}

export const useRouterStore = defineStore('router', (): RouterStore => ({
  nextRoute: '/',
  setNextRoute(path: string) {
    this.nextRoute = path
  },
  getNextRoute() {
    const nextRoute = this.nextRoute
    this.nextRoute = '/'
    return nextRoute
  }
}))