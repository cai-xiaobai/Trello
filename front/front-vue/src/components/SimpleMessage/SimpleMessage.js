import Vue from 'vue';
import SimpleMessage from './SimpleMessage.vue';

const SimpleMessageClass = Vue.extend(SimpleMessage);

/**
 * 工厂函数
 *  创建一个 SimpleMessage组件对象
 *  管理 Message 组件队列
 */
let instances = [];
function Message(data) {

    data = data || {};
    if( typeof data === 'string'){
        data = {
            message: data
        }
    };

// 消息关闭触发
    data.onClose = function() {
        Message.close(instance);
    }

    let instance = new SimpleMessageClass({
        data
    });
    instance.$mount();
    document.body.appendChild(instance.$el);

    let offset = data.offset || 20;
    let offsetTop = offset;
    instances.forEach( item => {
        offsetTop += item.$el.offsetHeight + offset;
    });

    instance.$el.style.top = offsetTop + 'px';

    instances.push(instance);
}

['info', 'success', 'error', 'warning'].forEach( type => {
    Message[type] = function(data) {
        if( typeof data === 'string'){
            data = {
                message: data
            }
        };
        data.type = type
        return Message(data)
    }
})

Message.close = function(instance) {
    /**
     * 获取当前这个instance的高度
     * 后面的实例的top减去高度，再减偏移
     */
    let removeHeight = instance.$el.offsetHeight + instance.offset;
    let index = instances.findIndex( item => item === instance);
    instances = instances.filter( item => item !== instance);

    for(let i = index; i<instances.length; i++ ){
        instances[i].$el.style.top = parseFloat(instances[i].$el.style.top) - removeHeight + 'px';
    }
}

export default Message;