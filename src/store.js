import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

// const user = JSON.parse(localStorage.getItem('UserData'));
// // const initialState = user ? { loggedIn: true, user } : { loggedIn: false, user: null };

const state = {
    user: {},
    token: ''
}

const actions = {
    setToken(context, payload) {
        localStorage.setItem('Token', payload);
        context.commit("SET_TOKEN", payload)
    },
    setUser(context, payload) {
        localStorage.setItem('UserData', JSON.stringify(payload));
        context.commit("SET_USER", payload)
    },

}
const mutations = {
    SET_TOKEN(state, payload) {
        state.token = payload
    },
    SET_USER(state, payload) {
        state.user = payload;
    },
}
const getters = {
    getUser: state => state.user,
    getToken: state => state.token
}



const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store