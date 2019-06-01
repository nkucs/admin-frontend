import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {

    list: [],
}

var mutations = {

    addList(state, data) {
        state.list = data
    }
    
}

const store =  new Vuex.Store({
  state,

  mutations,

})

export default store
