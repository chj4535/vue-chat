<template>
<v-container>
  <v-layout align-center justify-center>
    <v-flex>
      <v-text-field
        v-model="userName"
        label="닉네임"
      ></v-text-field>
       <v-text-field
        v-model="roomName"
        label="대화명"
        required
      ></v-text-field>
      <div class="text-xs-center">
        <v-btn @click="joinSubmit" round color="primary" dark>JOIN</v-btn>
      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'LoginForm',
  props: ['join'],
  data() {
    return {
      userName: '',
      roomName: ''
    };
  },
  methods: {
    joinSubmit() {
      console.log("joinsubmit",this.userName,this.roomName);  
      this.$emit('joinSubmit', this.userName,this.roomName);
    }
  },
};
</script>