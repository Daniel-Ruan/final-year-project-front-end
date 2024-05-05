import { defineStore } from "pinia"
import axios from 'axios'

type UserStore = {
    isDisplaySettings: boolean,
    isSignedIn: boolean,
    id: number,
    email: string,
    name: string,
    age: number,
    gender: string
    registerUser: (user: { username: string, email: string, password: string, age: string, gender: string }) => Promise<string>,
    validateUser: (user: { identifier: string, password: string }) => Promise<string>,
    recoverUser: () => void,
    removeUser: () => void,
    changePwd : (newPwd: string, code: string) => Promise<string>,
    storeDisplayButton: (isDisplay: boolean) => void,
}

export const useUserStore = defineStore('user', (): UserStore => ({
    isDisplaySettings: false,
    isSignedIn: false,
    id: -1,
    email: '',
    name: '',
    age: 0,
    gender: '',
    async registerUser(user) {
        try {
            const resp = await axios.post('/auth/local/register', user)
            this.validateUser({
                identifier: user.email,
                password: user.password
            })
            return ''
        }
        catch (error) {
            return 'fail to register! email already exists.'
        }
    },
    async validateUser(user) {
        try {
            const resp = await axios.post('/auth/local', user)

            this.isSignedIn = true
            this.id = resp.data.user.id
            this.email = resp.data.user.email
            this.name = resp.data.user.username
            this.age = resp.data.user.age
            this.gender = resp.data.user.gender

            localStorage.setItem("token", resp.data.jwt)
            const token = localStorage.getItem('token')
            axios.defaults.headers.common.Authorization = `Bearer ${resp.data.jwt}`
            return ''
        }
        catch (error) {
            return 'Fail to sign in, wrong email or password!'
        }
    },
    async recoverUser() {
        const token = localStorage.getItem('token')
        if (!token) {
            return
        }
        if (token && !this.isSignedIn) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            const resp = await axios.get(`/users/me`)
            this.isSignedIn = true
            this.id = resp.data.id
            this.email = resp.data.email
            this.name = resp.data.username
            this.age = resp.data.age
            this.gender = resp.data.gender
        }
    },
    removeUser() {
        delete axios.defaults.headers.common["Authorization"]
        localStorage.removeItem('token')
        this.isSignedIn = false
        this.id = -1
        this.email = ''
        this.name = ''
    },
    async changePwd(newPwd, code) {
        console.log(newPwd);
        console.log(code);

        await axios.post('auth/reset-password', {
            code: code,
            password: newPwd,
            passwordConfirmation: newPwd
        })
        return ''
    },
    storeDisplayButton(isDisplay) {
        this.isDisplaySettings = isDisplay
    }
    
}))