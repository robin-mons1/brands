<script setup lang='ts'>

    const supabase = useSupabaseClient();
    const email = ref("");
    const password = ref("");

    async function withGoogle() {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/callback`,
            }
        });
    }

    async function withFacebook() {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
                redirectTo: `${window.location.origin}`,
            }
        });
    }
</script>

<template>
    <div>
        <div class="p-4 bg-black flex flex-col gap-4 text-sm w-[500px]">
            <div class="flex gap-2 items-center">
                <img class="w-14" alt="creatormate - logo" src="/android-chrome-192x192.png">
            </div>

            <div>
                <h1 class="mb-2 text-3xl">Log in to your Account</h1>
                <p>Welcome back!, select method to log in</p>
            </div>
            <div class="w-full flex gap-4 my-2">
                <button @click="withGoogle"
                        class="bg-black text-white border border-white border-opacity-20 py-2 w-full">Google
                </button>
                <button @click="withFacebook"
                        class="bg-black text-white border border-white border-opacity-20 py-2 w-full">Facebook
                </button>
            </div>
            <div class="flex items-center gap-4">
                <div class="h-[1px] bg-white bg-opacity-20 w-full"></div>
                <p class="text-center text-gray-400">or</p>
                <div class="h-[1px] bg-white bg-opacity-20 w-full"></div>
            </div>

            <input v-model="email" type="email" placeholder="hello@creatormate.com"
                   class="bg-black border border-zinc-800 text-center py-2"/>
            <input v-model="password" type="password" placeholder="password"
                   class="bg-black border border-zinc-800 text-center py-2"/>
            <button class="bg-zinc-900 py-3">Log in</button>
            <div class="items-center justify-between flex">
                <div class="items-center flex gap-2">
                    <input type="checkbox" class="bg-black h-4 w-4" checked>
                    <label>Remember me</label>
                </div>
                <button class="underline">Forgot Password?</button>
            </div>
            <p  class="text-gray-400">
                Don't have an account? <span
                class="underline text-white">Create an account</span></p>
        </div>
    </div>
</template>