import axios from 'axios';
import SimpleMessage from '../components/SimpleMessage/SimpleMessage'

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH;

//请求拦截器
axios.interceptors.request.use( configs => {
    try {
        let data = JSON.parse(localStorage.getItem('user'));
        if (data.authorization) {
            configs.headers.common.authorization = data.authorization;
        }
    } catch (e) {
        
    }
    return configs;
});

//接收拦截器
axios.interceptors.response.use( response => {
    return response;
},error => {
    let {message, errorDetails} = error.response.data;
    if(errorDetails){
        message += ' : ' + errorDetails;
    }
    SimpleMessage.error(message);
    throw error;
});

//注册
export const register = data => {
    return axios({
        method: 'post',
        url: '/user/register',
        data
    })
};

//登录
export const login = data => {
    return axios({
        method: 'post',
        url: '/user/login',
        data
    })
};

//面板
//获取所有面板
export const getBoards = () => {
    return axios({
        url:'/board'
    })
};

// 获取一个面板
export const getBoard = id => {
    return axios({
        url: '/board/' + id
    })
};

//提交一个新的面板
export const postBoard = data => {
    return axios({
        method: 'post',
        url: '/board',
        data
    })
}


// 列表                   
// 获取一个指定面板下的所有列表集合
export const getLists = boardId =>  {
    return axios({
        url: '/list',
        params: {
            boardId
        }
    })
}

//添加一个新的列表
export const postList = data => {
    return axios({
        method: 'post',
        url:'/list',
        data
    })
}

// 编辑一个指定的列表
export const putList = data => {
    return axios({
        method: 'put',
        url: '/list/' + data.id,
        data: {
            boardId: data.boardId,
            name: data.name,
            order: data.order
        }
    })
};

// 名片
// 指定列表下的所有卡片
export const getCards = boardListId =>  {
    return axios({
        url: '/card',
        params: {
            boardListId
        }
    })
}

//添加一个新的卡片
export const postCard = data => {
    return axios({
        method: 'post',
        url:'/card',
        data
    })
}

// 编辑一个指定的卡片
export const putCard = data => {
    return axios({
        method: 'put',
        url: '/card/' + data.id,
        data: {
            boardListId: data.boardListId,
            name: data.name,
            description: data.description,
            order: data.order
        }
    })
};

// 上传附件
export const uploadAttachment = data => {
    let fd = new FormData();
    fd.append('boardListCardId', data.boardListCarId);
    fd.append('attachment', data.file);
    return axios({
        method: 'post',
        url:'/card/attachment',
        data: fd
    })
}

// 删除附件
export const removeAttachment = data => {
    return axios({
        method: 'delete',
        url:'/card/attachment/' + data.id
    })
}

// 设置封面
export const setCover = data => {
    return axios({
        method: 'put',
        url:'/card/attachment/cover/' + data.id
    })
}

// 移除封面
export const removeCover = data => {
    return axios({
        method: 'delete',
        url:'/card/attachment/cover/' + data.id
    })
}

// 获取评论列表
export const getComments = params => {
    return axios({
        url: '/comment',
        params
    })
}

// 增加评论
export const postComment = data => {
    return axios({
        method: 'post',
        url:'/comment',
        data
    })
}