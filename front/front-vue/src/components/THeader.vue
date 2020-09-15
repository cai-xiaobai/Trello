<template>
    <header>
            <div class="left">
                <router-link :to="{name: 'Home'}" class="btn btn-icon">
                    <i class="icon icon-home"></i>
                </router-link>
                <router-link :to="{name: 'Home'}"  class="btn btn-icon">
                    <i class="icon icon-board"></i>
                    <span class="txt">看板</span>
                </router-link>
            </div>
            <router-link :to="{name: 'Home'}"  class="logo"></router-link>
            <div class="right">
                <a href="" class="btn btn-icon">
                    <i class="icon icon-add"></i>
                </a>
                
                <simple-popup :title="user.name" ref="sPopup">
                    <button class="avatar">
                        <span>{{user.name[0].toUpperCase()}}</span>
                    </button>

                <simple-popup-menu slot="content" :items="menuItems" @command="execute"></simple-popup-menu>
                </simple-popup>
            </div>
        </header>
</template>

<script>
import SimplePopup from '@/components/SimplePopup'
import SimplePopupMenu from '@/components/SimplePopupMenu'
import { mapState } from 'vuex'

export default {
    name: 'THeader',
    components: { SimplePopup , SimplePopupMenu },
    data() {
        return {
            menuItems: [
                {name: '退出' , command: 'logout'}
            ]
        }
    },
    computed: {
        ...mapState('user', {
            user: state => state.info
        })
    },
    methods: {
        execute(command) {
            switch(command){
                case 'logout' :
                    this.logout();
                    break;
                default: 
                    break;
            }
        },

        logout() {
            this.$store.dispatch('user/logout');

            this.$router.push({name: 'Login'});
            // this.$refs.sPopup.close();
        }
    }
}
</script>