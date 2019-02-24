import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3014";
Vue.use(Vuex);

/* eslint-disable */

async function getAuthUser() {
    let user, err = null;
    const jwt = localStorage.getItem("jwt");
    if (jwt)
        try {
            console.log("trying fetch")

            const config = {
                headers: { 'Authorization': "Bearer " + jwt }
            };
            let response = await axios.get('/api/v1/me', config);
            console.log("fetched");
            const data = await response.data;
            if (data.err) throw new Error(data.err);
            user = data.user;
        } catch (error) {
            err = error.response.data.err;
            console.log(err);
        }
    else {
        err = "JWT is missing. Log in first";
        console.log(err);
    }
    return { user, err };
}



export default new Vuex.Store({
    state: {
        auth: {
            loggedInUser: null,
            isFetchingInitialAuth: false,
            isFetchingAuth: false,
            authError: null,
            initialAuthError: null
        },
        user:{
          isFetchingUpdate: false,
          oldUser: null
        }
    },
    mutations: {
        requestUserUpdate(state){
            state.user.isFetchingUpdate = true;
        },
        receiveUserUpdare(state){
            state.user.isFetchingUpdate = false;
        },
        requestInitialAuth(state) {
            state.auth.loggedInUser = null;
            state.auth.isFetchingInitialAuth = true;
            state.auth.initialAuthError = null;
        },
        receiveInitialAuth(state, payload) {
            console.log("PAYLOAD");
            console.log(payload);
            state.auth.loggedInUser = payload.user;
            state.auth.isFetchingInitialAuth = false;
            state.auth.initialAuthError = payload.err;
        },
        requestLogin(state) {
            state.auth.loggedInUser = null;
            state.auth.isFetchingAuth = true;
            state.auth.authError = null;
        },
        receiveLogin(state, payload) {
            console.log("PAYLOAD");
            console.log(payload);
            state.auth.loggedInUser = payload.user;
            state.auth.isFetchingAuth = false;
            state.auth.authError = payload.err;
        },
        logout(state) {
            console.log("LOGGED OUT");
            state.auth.loggedInUser = null;
            state.auth.isFetchingAuth = false;
            state.auth.authError = null;
        }
    },
    actions: {
        async test ({ commit }, {  location }){
            const bodyData = new URLSearchParams({
                name: location.formatted_address,
                coordinates: location.geometry.location
            });
            axios.post('/api/v1/test', bodyData);
        },
        async getEvents ({ commit }, {  page, per_page, filters }){
            let url = `/api/v1/event?page=${page}&per_page=${per_page}&filters=${filters.replace(" ", "+")}`
            const response = await axios.get(url);
            console.log(response.data);
            return response.data;
            
        },
        async fetchUserUpdate ({ commit }, { id, fullname, description, ava }){
            const jwt = localStorage.getItem("jwt");
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + jwt
              }
            };

            const res ={err: null, user: null};
            const formData = new FormData();
            formData.append("fullname", fullname);
            formData.append("description", description);
            if(ava) formData.append("ava", ava);
            try{
                const response = await axios.put(`/api/v1/user/${id.toString()}`, formData, config);
                res.user = response.data.user;

            }catch(err){
                console.error(err);
                res.err = err.response.data.err;;
            }
            return res;

            
        },
        NewEvent(context, credentials) {
            const jwt = localStorage.getItem("jwt");
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + jwt
              }
            };
            const formData = new FormData();
            formData.append("title", credentials.title);
            formData.append("description", credentials.description);
            formData.append("keywords", credentials.keywords);
            formData.append("place", credentials.place);
            formData.append("ava", credentials.ava);
            return new Promise((resolve, reject) => {
              axios.post('/api/v1/event', formData, config)
                .then(response => {
                  resolve(response.data)
                })
                .catch(err => {
                  console.log('error: ', err)
                  reject(err);
                }
                )
            })
          },
        async getPlaces (){
            let url = `/api/v1/places`
            const response = await axios.get(url);
            return response.data;
            
        },
        async fetchInitialAuth({ commit }) {
            commit("requestInitialAuth");
            const result = await getAuthUser();
            console.log("RESULT", result);
            commit("receiveInitialAuth", result);
            return result;
        },
        async fetchLogin({ commit }, { password, username }) {
            commit("requestLogin");
            let res = { user: null, err: null };
            const bodyData = new URLSearchParams({
                username,
                password
            });
            try {
                const authResult = await axios.post('/auth/login', bodyData);
                console.log(authResult.data);
                if (authResult.data.err) throw new Error(authResult.err);
                const jwt = authResult.data.token;
                localStorage.setItem("jwt", jwt); // save JWT
                res = await getAuthUser();
            } catch (error) {
                res.err = error.response.data.err;
                console.log(res.err);
            }
            commit("receiveLogin", res);
            return res;
        },
        async fetchRegister({ commit }, { password, username, fullname }) {
            commit("requestLogin");
            let res = { user: null, err: null };
            const bodyData = new URLSearchParams({
                username,
                password,
                fullname
            });
            try {

                let authResult = await axios.post('/auth/register', bodyData);
                console.log("DATA FROM REGISTER");
                console.log(authResult.data);
                if (authResult.data.err) throw new Error(authResult.err);
                res.user = authResult.data.user;
            } catch (error) {
                res.err = error.response.data.err;
                console.log(res.err);
            }
            commit("receiveLogin", { user: null, err: res.err });
            return res;
        },
        async fetchOauth({ commit }, { googleId, username, ava_url, fullname }) {
            commit("requestLogin");
            let res = { user: null, err: null };
            const bodyData = new URLSearchParams({
                username,
                googleId,
                ava_url,
                fullname
            });
            try {
                let authResult = await axios.post('/auth/oauth/login', bodyData);
                console.log("DATA FROM OAUTH");
                console.log(authResult.data);
                if (authResult.data.err) throw new Error(authResult.err);
                const jwt = authResult.data.token;
                localStorage.setItem("jwt", jwt);
                res.user = authResult.data.user;
            } catch (error) {
                res.err = error.response.data.err;
                console.log(res.err);
            }
            commit("receiveLogin", res);
        },
        logout({ commit }) {
            commit("logout");
            localStorage.removeItem("jwt");
        }
    }
})
