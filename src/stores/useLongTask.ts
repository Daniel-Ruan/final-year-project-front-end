import { defineStore } from "pinia"
import axios from 'axios'

export type LongTask = {
    id: number,
    book: number,
    LongTaskName: string,
    finish_date: string,
    LearningCycleDays: number,
    CertainDay: number,
    create_time: string,
    update_time: string,
    category: string,
    taskProgress: number,
    DailytaskID: number[],
    DailytaskRate: number[],
    DailytaskState: string[]
}

export type LongTaskDetail = {
    id: number,
    book: number,
    LongTaskName: string,
    finish_date: string,
    LearningCycleDays: number,
    CertainDay: number,
    create_time: string,
    update_time: string,
    category: string,
    taskProgress: number,
    DailytaskID: number[],
    DailytaskRate: number[],
    DailytaskState: string[]
}

type LongTaskStore = {
    // question_set: string[],
    longTaskList: LongTask[],
    currentLongTask: LongTaskDetail,
    currentLongTaskList: LongTask[],
    longTaskDetailCache: LongTaskDetail[],
    longTaskListCache: LongTask[],
    quetionSelectLsit: number[],
    quetionSelectResidueLsit: number[],
    longTaskQuestionList: number[],
    quetionSelectReviewLsit: number[],
    
    getLongTasks: () => void,
    getOneLongTask: (id: number) => void,
    postLongTask: (id: number, LongTaskName: string, finish_date: string, LearningCycleDays: number, create_time: string, update_time: string, category: string) => Promise<string>,
    getRandomQuestion: (questionSet: number[], randomNo: number) => number[]
    storeLongTaskQuestionList: (QuestionList: number[]) => number[],
    getNdayofCycle: (CertainDay: number, LearningCycleDays: number) => number,
    getReviewLsit1: (NdayofCycle: number, arr0: number[], arr1: number[], arr2: number[], arr3: number[], arr4: number[], arr5: number[]) => number[],
    getRandomQuestionNew: (questionList: number[], randomNo: number) => number[],
    updateLongTask: (id: number, CertainDay: number, update_time: string) => Promise<string>,
    getUpdateTimeArr: (longTaskList: LongTask[]) => string[],
    getLastUpdateTime: (UpdateTimeArr: string[]) => string,
    getTodayTaskNumber: (longTaskList: LongTask[]) => LongTask[],
    getHistoryTaskNumber: (longTaskList: LongTask[]) => LongTask[],
    getTaskProgress: (arr0: number[], arr1: number[], arr2: number[], arr3: number[], arr4: number[], arr5: number[]) => number,
    updateLongTaskTaskPrograss: (id: number, taskProgress: number) => Promise<string>,
    getDailyTaskRateArr: (longTaskList: LongTask[]) => number[][],
    getDailyTaskIDArr: (longTaskList: LongTask[]) => number[][],
    getLongTaskUpdateArr: (longTaskList: LongTask[]) => string[],
    getLongTaskCreateArr: (longTaskList: LongTask[]) => string[],
    getDailyTaskStateArr: (longTaskList: LongTask[]) => string[][],
    updateLongTaskUpdate_time: (id: number, update_time: string) => Promise<string>,
    updateLongTaskCertainDay: (id: number, CertainDay: number) => Promise<string>,


    // getQuestionSet: () => Promise<string[] | undefined> CertainDay
    //, finish_date: string, LearningCycleDays: number
}

export const useLongTaskStore = defineStore('longTask', (): LongTaskStore => ({
    // question_set: [],
    longTaskList: [],
    currentLongTask: {
        id: -1,
        book: -1,
        LongTaskName: '',
        finish_date: '',
        LearningCycleDays: 0,
        CertainDay: -1,
        create_time: '',
        update_time: '',
        category: '',
        taskProgress: 0,
        DailytaskID: [],
        DailytaskRate: [],
        DailytaskState: []
    },
    currentLongTaskList: [],
    longTaskDetailCache: [],
    longTaskListCache: [],

    quetionSelectLsit: [],
    quetionSelectResidueLsit: [],
    longTaskQuestionList: [],
    quetionSelectReviewLsit: [],

    async getLongTasks() {
        const resp = await axios.get('/longTasks?pagination[limit]=1000')
        const longTaskList = resp.data.data
        this.longTaskList = longTaskList
        this.currentLongTaskList = longTaskList
        this.longTaskListCache = longTaskList
    },

    async getOneLongTask(id) {
        let longTask: LongTaskDetail | undefined = this.longTaskDetailCache.find((l) =>{
            return l.id == id
        })
        if (!longTask) {
            const resp = await axios.get(`/longTasks/${id}`)
            longTask = resp.data.data
            if (longTask) {
                this.longTaskDetailCache.push(longTask)
            }
        }
        if (longTask) {
            this.currentLongTask = longTask
        }
        return longTask

    },

    async postLongTask(id, LongTaskName, finish_date, LearningCycleDays, create_time, update_time, category) {


        //, finish_date, LearningCycleDays
        const resp = await axios.post('/longTasks', {
            data: {
                book: id,
                LongTaskName: LongTaskName,
                finish_date: finish_date,
                LearningCycleDays: LearningCycleDays,
                create_time: create_time,
                update_time: update_time,
                category: category
            }
            
        })

        return 'ok'
    },

    getRandomQuestion(questionSet, randomNo) {
        
        let result: number[] = [];

        for (var i = 0; i < randomNo; i++) {
            var ran = Math.floor(Math.random() * questionSet.length);
            result.push(questionSet.splice(ran, 1)[0]);
        }
        result.sort((e1, e2) => {
            return e1 - e2
        })
        this.quetionSelectLsit = result
        this.quetionSelectResidueLsit = questionSet.sort((e1, e2) => {return e1 - e2})


        return result
    },

    getRandomQuestionNew(questionList, randomNo) {

        const arrCopy = questionList.slice()

        const result: number[] = []

        while (result.length < randomNo && arrCopy.length > 0) {
            const index = Math.floor(Math.random() * arrCopy.length)
            const num = arrCopy[index];
            arrCopy.splice(index, 1);
            result.push(num)
        }
        return result
    },

    storeLongTaskQuestionList(QuestionList) {
        // this.longTaskQuestionList
        QuestionList.forEach((question) => {
            this.longTaskQuestionList.push(question)
        })
        return this.longTaskQuestionList

    },

    getNdayofCycle(CertainDay, LearningCycleDays) {

        return CertainDay % LearningCycleDays
    },

    getReviewLsit1(NdayofCycle, arr0, arr1, arr2, arr3, arr4, arr5) {

        let reviewList1: number[] = []

        if(NdayofCycle==1 || NdayofCycle==3 || NdayofCycle==5 || NdayofCycle==7 || NdayofCycle==8 || NdayofCycle==10 || NdayofCycle==12 || NdayofCycle==14) {

            reviewList1 = arr1.concat(arr2)

            if(NdayofCycle==10) {
                reviewList1.push(...arr5)
                reviewList1.sort((e1, e2) => {
                    return e1 - e2
                })
            }else {
                reviewList1.sort((e1, e2) => {
                    return e1 - e2
                })
            }
        }else if(NdayofCycle==2 || NdayofCycle==6 || NdayofCycle==9 || NdayofCycle==13){

            reviewList1 = arr1.concat(arr3)

            reviewList1.sort((e1, e2) => {
                return e1 - e2
            })
        }else if(NdayofCycle==4 || NdayofCycle==11) {

            reviewList1 = arr1.concat(arr4)

            reviewList1.sort((e1, e2) => {
                return e1 - e2
            })
        }
        return this.quetionSelectReviewLsit = reviewList1
    },
    async updateLongTask(id, CertainDay, update_time) {

        const resp = await axios.put(`/longTasks/${id}`, {
            data: {
                CertainDay: CertainDay,
                update_time: update_time
            }

        })
        return 'ok'
    },
    getUpdateTimeArr(LongTask) {
        const timeList: string[] = []
        LongTask.forEach((longTaskLsit) => {
            timeList.push(longTaskLsit.update_time)
        })
        return timeList
    },
    getLastUpdateTime(UpdateTimeArr) {
        if (UpdateTimeArr.length ==0) {
            return "null date"
        }
        const maxDate = UpdateTimeArr.reduce((acc, curr) => {
            return new Date(curr) > new Date(acc) ? curr : acc;
        })
        return maxDate
    },
    getTodayTaskNumber(longTaskList) {

        const arr: LongTask[] = []
        const today: Date = new Date()
        const todayDate: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate());  

        longTaskList.forEach((longTask) =>{
            if (new Date(longTask.finish_date) >= new Date(longTask.update_time) && (new Date(longTask.update_time) != todayDate )) {
                arr.push(longTask)
            }
        })

        return arr
    },
    getHistoryTaskNumber(longTaskList) {

        const arr: LongTask[] = []
        const today: Date = new Date()
        const todayDate: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate());  

        longTaskList.forEach((longTask) =>{
            if (new Date(longTask.finish_date) < new Date(longTask.update_time) || (new Date(longTask.update_time) == todayDate )) {
                arr.push(longTask)
            }
        })

        return arr
    },
    getTaskProgress(arr0, arr1, arr2, arr3, arr4, arr5) {
        const total = arr0.length + arr1.length + arr2.length + arr3.length + arr4.length + arr5.length
        const finish = arr2.length + arr3.length + arr4.length + arr5.length
        const rate = finish / total
        return Math.round(rate * 100)
    },
    
    async updateLongTaskTaskPrograss(id, taskProgress) {
        const resp = await axios.put(`/longTasks/${id}`, {
            data: {
                taskProgress: taskProgress,
                
            }

        })
        return 'ok'

    },
    getDailyTaskRateArr(longTaskList) {
        const arrRate: Array<Array<number>> = []

        longTaskList.forEach((longTask) =>{
            if(longTask.DailytaskRate.length < 7) {
                const newarr = longTask.DailytaskRate
                const padding = new Array(7-newarr.length).fill(0)
                const newarr2 = newarr.concat(padding)
                arrRate.push(newarr2)
            }else {
                const newarr = longTask.DailytaskRate
                newarr.slice(newarr.length - 7, newarr.length)
                arrRate.push(newarr)
            }
        })

        return arrRate
    },
    getDailyTaskIDArr(longTaskList) {
        const arrRate: Array<Array<number>> = []

        longTaskList.forEach((longTask) =>{
            arrRate.push(longTask.DailytaskID)
        })

        return arrRate
    },
    getLongTaskUpdateArr(longTaskList) {
        const arrUpdate: string[] = []

        longTaskList.forEach((longTask) =>{
            arrUpdate.push(longTask.update_time)
        })
        arrUpdate.sort((e1, e2) => {
            const d1 = new Date(e1);
            const d2 = new Date(e2);
            return d1.getTime() - d2.getTime();
        })

        return arrUpdate

    },
    getLongTaskCreateArr(longTaskList) {
        const arrCreate: string[] = []

        longTaskList.forEach((longTask) =>{
            arrCreate.push(longTask.create_time)
        })

        arrCreate.sort((e1, e2) => {
            const d1 = new Date(e1);
            const d2 = new Date(e2);
            return d1.getTime() - d2.getTime();
        })

        return arrCreate

    },
    getDailyTaskStateArr(longTaskList) {

        const arrState: Array<Array<string>> = []

        longTaskList.forEach((longTask) =>{
            arrState.push(longTask.DailytaskState)
        })
        return arrState

    },
    async updateLongTaskUpdate_time(id, update_time) {

        const resp = await axios.put(`/longTasks/${id}`, {
            data: {
                update_time: update_time
            }

        })
        return 'ok'
    },
    async updateLongTaskCertainDay(id, CertainDay) {

        const resp = await axios.put(`/longTasks/${id}`, {
            data: {
                CertainDay: CertainDay
            }

        })
        return 'ok'
    }
    

    
}))