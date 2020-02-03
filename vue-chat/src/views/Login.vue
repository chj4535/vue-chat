<template>
    <div>
        <LoginForm-cmp v-on:joinSubmit="joinSubmit"></LoginForm-cmp>
    </div>
</template>

<script>
import LoginForm from '@/components/Login/LoginForm.vue'

export default {
    data () {
        return{

        };
    },
    components: {
        'LoginForm-cmp': LoginForm
    },
    methods: {
    joinSubmit(userName,roomName) {
      console.log("Login>joinsubmit",userName,roomName);
      this.$router.push({name:'ChatRoom',params:{userName,roomName}})      
    },
  },
}
</script>