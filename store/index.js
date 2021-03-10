const cookieparser = process.server ? require("cookieparser") : undefined

export const state = () => {
    return {
        user: "storeIndex"
    }
}
export const mutations = {
    setAuth(state, auth) {
        state.user = auth
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        // console.log("serverinit", req.headers);
        let auth = null;
        if (req.headers.cookie) {
            try {
                let parse = cookieparser.parse(req.headers.cookie)
                // console.log(parse);
                // console.log(parse.auth);
                // console.log(parse.auth instanceof Object);
                auth = parse.auth && !(parse.auth instanceof Object) ? JSON.parse(parse.auth) : parse.auth;
            } catch (error) {
                console.log(error);
            }
            commit('setAuth', auth)
        }

    }
}