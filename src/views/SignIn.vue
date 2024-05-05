<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch, triggerRef, reactive } from 'vue';
import LayoutGuest from "../layouts/LayoutGuest.vue";
import SectionFullScreen from "../components/SectionFullScreen.vue";

import FormVue, { FormValidationFunc } from '../components/rawComponents/Form.vue';
import TextInputVue from '../components/rawComponents/TextInput.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/useUserStore';
import { useRouterStore } from '../stores/useRouterStore';

const routerStore = useRouterStore()
const router = useRouter()
const userStore = useUserStore()
onMounted(async () => {
    userStore.recoverUser()
    if (userStore.id != -1) {
        router.push('/profile')
    } else {
        routerStore.setNextRoute('/profile')
    }
})

const formValidation: FormValidationFunc = async (inputBoxes) => {
    const info = await userStore.validateUser({
        identifier: inputBoxes.get('Email')?.getContent() as string,
        password: inputBoxes.get('Password')?.getContent() as string
    })
    if (info.length == 0) {
        router.push('/profile')
        // router.push(routerStore.getNextRoute())
    }
    // router.push('/profile')
    return info
    
}


</script>

<template>
    <LayoutGuest>
        <SectionFullScreen v-slot="{ cardClass }" bg="pinkRed">
            <FormVue :class="cardClass" :form-validation="formValidation"> 
                <template #title>Sign in</template>
                <template #input>
                    <TextInputVue :title="'Email'" :type="'email'" />
                    <TextInputVue :title="'Password'" :type="'password'" />
                </template>
                
            </FormVue>


        </SectionFullScreen>

    </LayoutGuest>


</template>