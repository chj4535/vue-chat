<template>
    <div>
        chatroom User {{ $route.params.userName }}
        <MessageList :msgs="datas"></MessageList>
        <MessageInput v-on:sendSubmit="sendSubmit"></MessageInput>
    </div>
</template>

<script>
    import MessageList from '@/components/Chat/MessageList.vue';
    import MessageInput from '@/components/Chat/MessageInput.vue';
    export default {
        data() {
            return {
                datas: []
            }
        },
        created() {
            console.log("chatroom with", this.$route.params.roomName, this.$route.params.userName);

            const $ths = this;
            this.$socket.emit('joinRoom-ser', {
                roomName: this.$route.params.roomName,
                userName: this.$route.params.userName,
            })
            this.$socket.on('joinRoom-cli', (data) => {
                console.log("chatroom check join", data.userName);
                $ths.datas.push({
                    name: "sys",
                    msg: data.userName + " join a " + data.roomName,
                    time:data.time
                })
            })
            this.$socket.on('sendSubmit-cli', (data) => {
                console.log("chatroom check msg", data.inputMsg);
                if(data.userName==this.$route.params.userName){
                    $ths.datas.push({
                    name: 'me',
                    msg: data.inputMsg,
                    time:data.time
                })
                }
                else{
                    $ths.datas.push({
                    name: data.userName,
                    msg: data.inputMsg,
                    time:data.time
                })
                }
            })

        },
        components: {
            'MessageList': MessageList,
            'MessageInput': MessageInput,
        },
        methods: {
            sendSubmit(inputmsg) {
                // var $ths = this;
                console.log("ChatRoom>sendSubmit : ", inputmsg);
                this.$socket.emit('sendSubmit-ser', {
                    roomName: this.$route.params.roomName,
                    userName: this.$route.params.userName,
                    inputMsg: inputmsg,
                })
            },
        }
    }
</script>