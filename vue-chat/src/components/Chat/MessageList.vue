<template>
  <v-list v-auto-bottom="msgs">
    <transition-group name="list" >
      <div v-for="(msg,index) in msgs" v-bind:key="index">
           <v-input
           :messages="[msg.time]"
           >
            {{msg.name}} : {{msg.msg}}
           </v-input>
      </div>
    </transition-group>
  </v-list>
</template>


<script>
export default {
  name: 'MessageList',
  props: ['msgs'],
};
</script>