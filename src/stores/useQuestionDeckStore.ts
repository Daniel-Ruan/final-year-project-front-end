import { defineStore } from "pinia"
import axios from 'axios'

export type QuestionDeck = {
    id: number,
    question: number,
    student: number,
    longtask: number,
    RepeatCounter: number,
    questionStatus: number,
    write_time: string,
}

export type QuestionDeckDetail = {
    id: number,
    question: number,
    student: number,
    longtask: number,
    RepeatCounter: number,
    questionStatus: number,
    write_time: string,
}

type  QuestionDeckStore = {

    
    currentQuestionDeckQuestionStatus: number,
    currentQuestionDeckList: QuestionDeck[],
    currentQuestionDeck: QuestionDeckDetail,
    QuestionDeckListCache: QuestionDeck[],
    QuestionDeckDetailCache: QuestionDeckDetail[],
    currentLongTaskQuestionDeckList: QuestionDeck[],
    currentQuestionDeckByQuestionID: QuestionDeck,

    getQuestionDeckList: () => void,

    getQuestionDeck: (id: number) => void,

    postQuestionDeck: (longtask: number, question: number, write_time: string, questionStatus: number, RepeatCounter: number) => Promise<string>,

    updateDailyTaskQuestionDeck: (id: number, questionStatus: number, RepeatCounter: number, write_time: string) => Promise<string>,

    getQuestionsByLongTaskIDs: (id: number) => QuestionDeck[],

    judgeQuestionDeckStatus: (result: boolean, currentQuestionDeckStatus: number) => number,

    getQuestionDeckByQuestionID: (questionId: number) => number,

    getQuestionDeckIDByQuestionID: (questionId: number) => number,

    getQuestionDeckIDByQuestionRepeatCounter: (questionId: number) => number,

    getQuestionListByQuestionDeckStatus: (questionStatus: number) => number[]



}

export const useQuestionDeckStore = defineStore('questionDeck', (): QuestionDeckStore => ({

    currentQuestionDeckQuestionStatus: -1,

    currentQuestionDeck: {
        id: -1,
        question: -1,
        student: -1,
        longtask: -1,
        RepeatCounter: -1,
        questionStatus: -1,
        write_time: ''
    },

    currentQuestionDeckByQuestionID: {
        id: -1,
        question: -1,
        student: -1,
        longtask: -1,
        RepeatCounter: -1,
        questionStatus: -1,
        write_time: ''
    },
    currentQuestionDeckList: [],
    QuestionDeckListCache: [],
    QuestionDeckDetailCache: [],
    currentLongTaskQuestionDeckList: [],

    async getQuestionDeckList() {
        const resp = await axios.get('/question-decks?pagination[limit]=10000')
        const QuestionDeckList = resp.data.data
        this.currentQuestionDeckList = QuestionDeckList
        this.QuestionDeckListCache = QuestionDeckList
    },

    async getQuestionDeck(id) {

        let questionDeck: QuestionDeckDetail | undefined = this.QuestionDeckListCache.find((qd) =>{
            return qd.id == id
        })
        if (!questionDeck) {
            const resp = await axios.get(`/question-decks/${id}`)
            questionDeck = resp.data.data
            if (questionDeck) {
                this.QuestionDeckDetailCache.push(questionDeck)
            }
        }
        if (questionDeck) {
            this.currentQuestionDeck = questionDeck
        }
        return questionDeck
    },

    async postQuestionDeck(longtask, question, write_time, questionStatus, RepeatCounter ) {

        const resp = await axios.post('/question-decks', {
            data: {
                longtask: longtask,
                question: question,
                write_time: write_time,
                questionStatus: questionStatus,
                RepeatCounter: RepeatCounter
            }
        })
        return 'ok'
    },
    async updateDailyTaskQuestionDeck(id, questionStatus, RepeatCounter, write_time) {

        const resp = await axios.put(`/question-decks/${id}`, {
            data: {
                questionStatus: questionStatus,
                RepeatCounter: RepeatCounter,
                write_time: write_time
            }
        })
        return 'ok'

    },

    getQuestionsByLongTaskIDs(id) {

        return this.currentLongTaskQuestionDeckList = this.QuestionDeckListCache.filter((question) => {
            return question.longtask == id
        })
    },

    judgeQuestionDeckStatus(result, currentQuestionDeckStatus) {

        if(currentQuestionDeckStatus == 0) {
            
            if(result==true) {

                return 2

            }else {

                return 1
            }

        }else if(currentQuestionDeckStatus >=1 && currentQuestionDeckStatus <=4) {

            if(result==true) {
                return currentQuestionDeckStatus+1
            }else {
                return 1
            }  
              
        }else{

            if(result==true) {
                return currentQuestionDeckStatus
            }else{
                return 1
            }
            
        }
    },

    getQuestionDeckByQuestionID(questionId) {


        let currentQuestionDeckQuestionStatus2: number  = this.currentLongTaskQuestionDeckList.find((questionDeck) => {
            return questionDeck.question == questionId
        })?.questionStatus!

        

        return currentQuestionDeckQuestionStatus2

    },

    getQuestionDeckIDByQuestionID(questionId) {


        let currentQuestionDeckQuestionId: number  = this.currentLongTaskQuestionDeckList.find((questionDeck) => {
            return questionDeck.question == questionId
        })?.id!

        

        return currentQuestionDeckQuestionId

    },

    getQuestionDeckIDByQuestionRepeatCounter(questionId) {


        let currentQuestionDeckQuestionRepeatCounter: number  = this.currentLongTaskQuestionDeckList.find((questionDeck) => {
            return questionDeck.question == questionId
        })?.RepeatCounter!

        

        return currentQuestionDeckQuestionRepeatCounter

    },

    getQuestionListByQuestionDeckStatus(questionStatus) {

        const QuestionList: number[] = []

        this.currentLongTaskQuestionDeckList.filter((questionDeckStatus) => {
            return questionDeckStatus.questionStatus == questionStatus
        }).forEach((questionDeck) => {
            QuestionList.push(questionDeck.question)
        })

        QuestionList.sort((e1, e2) => {
            return e1 - e2
        })

        return QuestionList

    }

    



}))

