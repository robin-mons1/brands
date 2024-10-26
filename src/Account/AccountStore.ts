//@ts-ignore
import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {useSupabaseClient} from "../../.nuxt/imports";
import {useRouter} from "nuxt/app";
import {ServerUser} from "../../server/utils/GetServerUser";

export const useAccountStore = defineStore("account", () => {
    const user: Ref<null|ServerUser> = ref(null);
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    let ip: string = "";

    async function logout() {
        await supabaseClient.auth.signOut();
        user.value = null;
        await router.push('/login');
    }

    async function get() {
        user.value = await $fetch('/api/users/get-users');
    }

    return {user, get}
})