import { createStore, Commit, Store } from 'vuex'
import { $http } from "../main"
import { IMenu } from "../type/types"
import { treeDataHandle } from "../utils/treeDataHandle"

export interface State {
  username: string,
  count: number,
  token: string,
  menus: IMenu[]
}

export default createStore<State>({
  state: {
    username: 'ming',
    count: 1,
    token: JSON.stringify(localStorage.getItem('token')) || '',
    menus: []
  },
  getters: {
  },
  mutations: {
    setName(state: State, payload: string): void {
      state.username = payload
    },
    getMenu(state: State, menus: IMenu[]): void {
      state.menus = menus
    }
  },

  actions: {
    async fetchMenu({ commit }): Promise<any> {
      // $http.get("/admin/info").then((res) => {
      //   if (res.code === 200) {
      //     const menu: IMenu[] = res.data.menus.map((item: IMenu) => {
      //       return {
      //         ...item,
      //         path: `/${item.name}`,
      //         component: () => import('../Home/index.vue')
      //       }
      //     })
      //     state.menu = formmatMenu(menu);
      //     console.log(state.menu)
      //     state.openKeys = [state.menu[0].id];
      //     state.selectedKeys = [state.menu[0].children?.[0]?.id]
      //   }
      // })
      let menuRes: IMenu[] = (await $http.get("/admin/info")).data.menus
      commit('getMenu', treeDataHandle(menuRes))
    }
  },
  modules: {
  }
})



