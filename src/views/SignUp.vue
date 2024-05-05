<script setup lang='ts'>
import LayoutGuest from "../layouts/LayoutGuest.vue";
import SectionFullScreen from "../components/SectionFullScreen.vue";
import { mdiAccount, mdiAsterisk } from "@mdi/js";

import FormVue, { FormValidationFunc } from '../components/rawComponents/Form.vue';
import TextInputVue from '../components/rawComponents/TextInput.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/useUserStore';

const userStore = useUserStore()
const router = useRouter()

const formValidation: FormValidationFunc = async (inputBoxes) => {
    let pwd = inputBoxes.get('Password')?.getContent()
    let cpwd = inputBoxes.get('Confirm Password')?.getContent()
    if (pwd != cpwd) {
        return 'the password confirmed is different!'
    }
    else {
        const info = await userStore.registerUser({
            username: inputBoxes.get('Username')?.getContent() as string,
            email: inputBoxes.get('Email')?.getContent() as string,
            age: inputBoxes.get('Age')?.getContent() as string,
            gender: inputBoxes.get('Gender')?.getContent() as string,
            password: pwd as string
        })
        if (info.length == 0) {
            router.push('/profile')
        }
        return info
    }
}

</script>

<template>
    <LayoutGuest>
        <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
            <FormVue :class="cardClass" :form-validation="formValidation">
                <template #title>Register Your Account</template>
                <template #input>
                    <TextInputVue :title="'Email'" :type="'email'" placeholder="Please enter your email address" />
                    <TextInputVue :title="'Username'" :type="'username'" placeholder="Please enter your username" />
                    <TextInputVue :title="'Age'" :type="'age'" placeholder="Please enter your age" />
                    <TextInputVue :title="'Gender'" :type="'gender'" placeholder="Please enter M or F" />
                    <TextInputVue :title="'Password'" :type="'password'" placeholder="Please enter your password" />
                    <TextInputVue :title="'Confirm Password'" :type="'password'" placeholder="Please confirm your password" />
                </template>
            </FormVue>
        </SectionFullScreen>
    </LayoutGuest>

</template>