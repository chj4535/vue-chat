<template>
    <v-container>
        <v-layout align-center justify-center>
            <v-flex>
                <v-text-field v-model="inputmsg" label="채팅"></v-text-field>
                <div class="text-xs-center">
                    <v-btn @click="sendSubmit" round color="primary" dark>submit</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        name: 'MessageInput',
        data() {
            return {
                inputmsg: ''
            }
        },
        methods: {
            sendSubmit() {
                console.log("sendSubmit", this.inputmsg);
                this.$emit('sendSubmit', this.inputmsg);
            }
        },
    };
</script>