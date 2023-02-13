import { createStore } from 'vuex'

const defaultState={
    count:0
}
export default createStore({
    state(){
        return defaultState
    },
    mutations:{
        increment(state:typeof defaultState){
            state.count++;
        },
        logout(state){
        }
    },
    actions:{
        increment(context){
          context.commit('increment')
        },
        logout({commit}){
            commit('logout')
        }

    },
    getters:{
        double(state:typeof defaultState){
            return 2*state.count
        }
    }

})