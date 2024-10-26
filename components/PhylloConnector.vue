<script setup lang='ts'>
    import {onMounted} from "vue";

    let connector: any = null;

    const emits = defineEmits(['close']);

    onMounted(() => {
        const config: PhylloConfig = {
            clientDisplayName: 'creator mate',
            environment: 'staging',
            userId: 'ee1554bf-69cf-4b60-8a85-a178cddc8e85',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZWUxNTU0YmYtNjljZi00YjYwLThhODUtYTE3OGNkZGM4ZTg1IiwidGVuYW50X2lkIjoiNTczMWIxMzMtY2JkYy00MDhmLTllNTAtMGY4MWI0YmM2YjM1IiwidGVuYW50X2FwcF9pZCI6ImJkMWUzMmNkLWIxNDAtNDAyMS04YWZjLTc0NGY5NjdlMjE2NCIsInByb2R1Y3RzIjpbIkFDVElWSVRZIiwiRU5HQUdFTUVOVF9BVURJRU5DRSIsIklERU5USVRZX0FVRElFTkNFIiwiSURFTlRJVFkiLCJFTkdBR0VNRU5UIiwiSU5DT01FIl0sImlzcyI6Imh0dHBzOi8vYXBpLmdldHBoeWxsby5jb20iLCJhdWQiOiJodHRwczovL2FwaS5nZXRwaHlsbG8uY29tL3YxL2ludGVybmFsIiwiaWF0IjoxNzI5OTUzMzg5LjM2MTg2NiwiZXhwIjoxNzMwNTU4MTg5LjM2MTg1OX0.isAOqxW6J7zIMywEEatHKi6o60rgZxykrqW3UixNBRc',
            redirect: true,
            workPlatformId: '9bb8913b-ddd9-430b-a66a-d74d846e6c66',
            redirectURL: 'http://localhost:3000',
        };

        const phylloConnect = PhylloConnect.initialize(config);

        phylloConnect.on("accountConnected", (accountId: any, workplatformId: any, userId: any) => {  // gives the successfully connected account ID and work platform ID for the given user ID
            console.log(`onAccountConnected: ${accountId}, ${workplatformId}, ${userId}`);
        })

        phylloConnect.on("accountDisconnected", (accountId: any, workplatformId: any, userId: any) => {  // gives the successfully disconnected account ID and work platform ID for the given user ID
            console.log(`onAccountDisconnected: ${accountId}, ${workplatformId}, ${userId}`);
        })
        phylloConnect.on("tokenExpired", (userId: any) => {  // gives the user ID for which the token has expired
            console.log(`onTokenExpired: ${userId}`);  // the SDK closes automatically in case the token has expired, and you need to handle this by showing an appropriate UI and messaging to the users
        })
        phylloConnect.on("exit", (reason: any, userId: any) => {  // indicates that the user with given user ID has closed the SDK and gives an appropriate reason for it
            console.log(`onExit: ${reason}, ${userId}`);
        })
        phylloConnect.on("connectionFailure", (reason: any, workplatformId: any, userId: any) => {  // optional, indicates that the user with given user ID has attempted connecting to the work platform but resulted in a failure and gives an appropriate reason for it
            console.log(`onConnectionFailure: ${reason}, ${workplatformId}, ${userId}`);
        })

        connector = phylloConnect;
    })
</script>

<template>
    <div class="bg-yellow-500 w-full h-140 flex justify-between p-2 items-center">
        <div class="flex items-center gap-2">
            <p class="">you dont have any accounts linked yet</p>
            <button @click="connector.open()" class="px-2 py-1 bg-white rounded-2xl hover:underline">link now</button>
        </div>
        <button class="text-2xl" @click="emits('close')">
            x
        </button>
    </div>
</template>