<template>
    <div class="popup-container">
        <div @click="open">
            <slot></slot>
        </div>

        <div class="popup" v-show="isShow" ref="popup">
            <div class="popup-header">
                <span class="popup-title">{{title}}</span>
                <a class="popup-header-close" @click.stop="close($event)" ref="close">
                    <i class="icon icon-close"></i>
                </a>
            </div>

            <div class="popup-content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SimplePopup',
    props: {
        title:{
            type:String,
            default:'菜单'
        }
    },
    data() {
        return {
            isShow: false
        }
    },

    methods: {
        open() {
            this.isShow = true
            let $popup = this.$refs.popup;
            window.addEventListener('click',this.close);
            this.$nextTick( ()=> {
                $popup.style.left = '0px';
                let $popupRect = $popup.getBoundingClientRect();
                let left = 0
                if( $popupRect.right > window.innerWidth){
                    //超出
                    left = -$popupRect.width + this.$el.offsetWidth;
                }
                $popup.style.left = left + 'px';
            })
            this.$emit('open');
        },

        close(e) {
            if(!e || e.target.parentNode === this.$refs.close || e.target.parentNode.offsetParent === null){
                this.isShow = false;
                this.$emit('close');
                window.removeEventListener('click',this.close);
            }
        }
    }
}
</script>