import * as api from '@/api'

export default {
    namespaced: true,

    state: {},

    mutations: {
    },
    
    actions: {
        getComments: async ({}, params) => {

            return api.getComments(params);

        },

        postComment: async ({}, data) => {
            let rs = await api.postComment(data)
            return rs;
        }
    }
}