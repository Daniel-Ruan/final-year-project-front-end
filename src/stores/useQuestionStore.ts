import { defineStore } from "pinia";
import axios from 'axios';

export type Question = {
    q_id: number,
    q_question: string,
    q_category: string,
    q_a: string,
    q_b: string,
    q_c: string,
    q_d: string,
    q_true_answer: string,
    q_state: string,
    q_cover: string,
    KeyWord: string,
    KeyWordDescription: string,
    wikiUrl: string,
    q_selection_set: string[]
}

export type QuestionDetail = {
    q_id: number,
    q_question: string,
    q_category: string,
    q_a: string,
    q_b: string,
    q_c: string,
    q_d: string,
    q_true_answer: string,
    q_state: string,
    q_cover: string,
    KeyWord: string,
    KeyWordDescription: string,
    wikiUrl: string,
    q_images: string[],
    q_selection_set: string[]
    
}

export type QuestionSelect = {
    a: string,
    b: string,
    c: string,
    d: string,
}

type QuestionStore = {
    nextid: number,
    selectAnswer: string,
    currentQuestion: QuestionDetail,
    currentQuestionList: Question[],
    questionDetailCache: QuestionDetail[],
    questionListCache: Question[],
    dailyTaskQuestionList: Question[],
    QuestionSelectgroup: QuestionSelect
    getQuestion: (id: number) => void,
    clearCurrentQuestion: () => void,
    resetCurrentQuestionList: () => void,
    getQuestionList: () => void,
    getQuestionListByCategory: (category: string) => Question[],
    getQuestionListSlice: (start: number, size: number) => Question[],
    getQuestionsByIDs: (ids: number[]) => Question[],
    getNextQuestion: () => number,
    getdailyTaskQuestionList: (questionSet: number[]) => void,
    getQuestionDailyListSlice: (start: number, size: number) => Question[],
    getQuestionSelectgroup: () => QuestionSelect,
    getSelectAnswer: (ans: string) => void,
    clearSelectAnswer: () => void,
    setDailyTaskRelation: (id: number, DailyTaskID: number) => void,
    judgeLastQuestion: (id: number) => string,
    conbineTwoQuestionLsit: (arr1: number[], arr2: number[]) => number[],
    removeLsitElement: (arr1: number[], arr2: number[]) => number[],
    sortCategoryNumber: (QuestionList: Question[]) => string[],
    getNewQuestionListByCategoryArr: (QuestionList: Question[], arr: string[]) => Question[],
    differentLsitElement: (arr1: number[], arr2: number[]) => number[],
    getQuestionListArr: (QuestionList: Question[]) => number[],
    sellectPartofQuestionListArr: (arr1: number[], count: number) => number[],
}

export const useQuestionStore = defineStore('questions', (): QuestionStore => ({
    currentQuestion: {
        q_id: -1,
        q_question: '',
        q_category: '',
        q_a: '',
        q_b: '',
        q_c: '',
        q_d: '',
        q_true_answer: '',
        q_state: '',
        q_cover: '',
        KeyWord: '',
        KeyWordDescription: '',
        wikiUrl: '',
        q_images: [],
        q_selection_set: []
    },
    QuestionSelectgroup: {
        a: '',
        b: '',
        c: '',
        d: '',
    },
    currentQuestionList: [],
    questionDetailCache: [],
    questionListCache: [],
    dailyTaskQuestionList: [],
    nextid: -1,
    selectAnswer: '',

    async getQuestionList() {
        const resp = await axios.get(`/questions?pagination[limit]=1000`)
        const questions = resp.data.data
        this.questionListCache = questions
        this.currentQuestionList = questions
    },

    async getQuestion(id) {
        let question: QuestionDetail | undefined = this.questionDetailCache.find((q) =>{
            return q.q_id == id
        })
        if (!question) {
            const resp = await axios.get(`/questions/${id}`)
            question = resp.data.data
            if (question) {
                this.questionDetailCache.push(question)
            }
        }
        if (question) {
            this.currentQuestion = question
        }
        return question
    },

    clearCurrentQuestion() {
        this.currentQuestion = {
            q_id: -1,
            q_question: '',
            q_category: '',
            q_a: '',
            q_b: '',
            q_c: '',
            q_d: '',
            q_state: '',
            q_true_answer: '',
            q_cover: '',
            KeyWord: '',
            KeyWordDescription: '',
            wikiUrl: '',
            q_images: [],
            q_selection_set: []
        }
    },

    resetCurrentQuestionList() {
        this.currentQuestionList = this.questionListCache
    },



    getQuestionsByIDs(ids) {
        return this.questionListCache.filter((question) => {
            return ids.includes(question.q_id)
        })
    },

    getQuestionListByCategory(category) {
        // if (category == 'all') {
        //     this.currentQuestionList = this.questionListCache
        //     return []
        // }
        return this.questionListCache.filter((question) => {
            return question.q_category == category
        })
    },
    getQuestionListSlice(start, size) {
        if (start > this.currentQuestionList.length) {
            return []
        }
        else {
            return this.currentQuestionList.slice(start, start + size)
        }
    },
    getNextQuestion() {
        // this.nextid = this.currentQuestion.q_id
        //index = this.questionListCache.findIndex((question) => {return question.q_id > this.currentQuestion.q_id})
        //index = index + 1
        //this.questionListCache[index].q_id
        // return this.nextid = this.questionListCache[this.questionListCache.findIndex((question) => {return question.q_id > this.currentQuestion.q_id})].q_id

        return this.nextid = this.dailyTaskQuestionList[this.dailyTaskQuestionList.findIndex((question) => {
            return question.q_id > this.currentQuestion.q_id
        })].q_id
            
    },

    judgeLastQuestion(id) {
        if(id == this.dailyTaskQuestionList[0].q_id) {
            return 'first'
        }
        else if(id == this.dailyTaskQuestionList[this.dailyTaskQuestionList.length-1].q_id) {
            return 'last'
        }else{

            return 'middle'
        }
    },

    getdailyTaskQuestionList(questionSet) {
        this.dailyTaskQuestionList = this.questionListCache.filter((question) => {
            return questionSet.includes(question.q_id)
        
        })
    },
    getQuestionDailyListSlice(start, size) {
        if (start > this.dailyTaskQuestionList.length) {
            return []
        }
        else {
            return this.dailyTaskQuestionList.slice(start, start + size)
        }
    },
    getQuestionSelectgroup() {
        this.QuestionSelectgroup.a = this.currentQuestion.q_a
        this.QuestionSelectgroup.b = this.currentQuestion.q_b
        this.QuestionSelectgroup.c = this.currentQuestion.q_c
        this.QuestionSelectgroup.d = this.currentQuestion.q_d
        return this.QuestionSelectgroup
    },
    getSelectAnswer(ans) {
        this.selectAnswer = ans
    },
    clearSelectAnswer() {
        this.selectAnswer = ''
    },
    async setDailyTaskRelation(id, DailyTaskID) {

        const resp = await axios.put(`/questions/${id}`, {
            data: {
                dailytasks: DailyTaskID
            }

        })

    },

    conbineTwoQuestionLsit(arr1, arr2) {
        // const result: number[] = []
        return arr1.concat(arr2)
    },

    removeLsitElement(arr1, arr2) {
        // const result: number[] = []
        return arr1.filter(item => !arr2.includes(item))

    },

    sortCategoryNumber(QuestionList) {

        const count: { [key: string]: number } = {};

        QuestionList.forEach((item: Question) => {
            if (count[item.q_category]) {
                count[item.q_category]++;
            }else {
                count[item.q_category] = 1;
            }
        });

        const result: { [key: string]: number } = {};

        for (let q_category in count) {

            result[q_category] = count[q_category]
            
        }

        const sortedResult: { [key: string]: number } = {};

        Object.keys(result).sort((a: string, b: string) => result[b] - result[a]).forEach((key: string) => {
            sortedResult[key] = result[key];
        })

        const category: string[] = [];

        Object.keys(sortedResult).forEach((key: string) => {
            category.push(key)
        })


        return category
    },

    getNewQuestionListByCategoryArr(QuestionList, arr) {

        let foundItem: Question[] = []

        arr.forEach(key => {
            foundItem.push(...QuestionList.filter((question) => {
                return question.q_category == key
            }))
        })

        return foundItem

    },

    differentLsitElement(arr1, arr2) {

        const uniqueArr = arr1.filter(item => !arr2.includes(item)).concat(arr2.filter(item => !arr1.includes(item)));
        
        return uniqueArr

    },

    getQuestionListArr(QuestionList) {

        const arr: number[] = []

        QuestionList.forEach((question) => {
            arr.push(question.q_id)
        })

        return arr
    },

    sellectPartofQuestionListArr(arr1,count) {

        const newArr: number[] = [...arr1].slice(0, count)

        return newArr
    }

}))