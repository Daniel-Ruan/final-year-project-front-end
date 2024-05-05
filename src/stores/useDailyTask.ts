import { defineStore } from "pinia"
import axios from 'axios'


export type DailyTask = {
    id: number,
    student: number,
    Longtask: number,
    DailyTaskName: string,
    planned_time: string,
    n_questions: number,
    questions_set: string,
    daily_state: string,
    questions: number[],
    accuracy: number,

}
export type DailyTaskDetail = {
    id: number,
    // student: number,
    Longtask: number,
    DailyTaskName: string,
    planned_time: string,
    n_questions: number,
    questions_set: string,
    daily_state: string,
    questions: number[],
    accuracy: number,

}

type  DailyTaskStore = {

    trueAnswerNumber: number,
    falseAnswerNumber: number,
    currentDailyTaskList: DailyTask[],
    currentDailyTask: DailyTaskDetail,
    DailyTaskListCache: DailyTask[],
    DailyTaskDetailCache: DailyTaskDetail[],
    currentDailyTaskListByLongTaskID: DailyTask[],

    getDailyTasksList: () => void,

    getDailyTask: (id: number) => void,

    postDailyTask: (Longtask: number, DailyTaskName: string, planned_time: string, n_questions: number, questions_set: string) => Promise<string>,

    getDailyTaskByLongTask: (longTaskId: number) => DailyTask[],

    countAnswerNumber: (Answer: boolean) => void,

    updateDailyTaskState: (id: number, accuracy: number) => Promise<string>

    deleteDailyTask: (id: number) => Promise<string>

    removeRecord: () => void,


}

export const useDailyTaskStore = defineStore('dailyTask', (): DailyTaskStore => ({
    currentDailyTask: {
        id: -1,
        Longtask: -1,
        DailyTaskName: '',
        planned_time: '',
        n_questions: 0,
        questions_set: '',
        daily_state: '',
        questions: [],
        accuracy: 0

    },
    currentDailyTaskList: [],
    DailyTaskListCache: [],
    DailyTaskDetailCache: [],
    currentDailyTaskListByLongTaskID: [],
    trueAnswerNumber: 0,
    falseAnswerNumber: 0,

    async getDailyTasksList() {
        const resp = await axios.get('/dailytasks?pagination[limit]=1000')
        const DailyTaskList = resp.data.data
        this.currentDailyTaskList = DailyTaskList
        this.DailyTaskListCache = DailyTaskList
    },

    async getDailyTask(id) {

        let dailyTask: DailyTaskDetail | undefined = this.DailyTaskListCache.find((d) =>{
            return d.id == id
        })
        if (!dailyTask) {
            const resp = await axios.get(`/dailytasks/${id}`)
            dailyTask = resp.data.data
            if (dailyTask) {
                this.DailyTaskDetailCache.push(dailyTask)
            }
        }
        if (dailyTask) {
            this.currentDailyTask = dailyTask
        }
        return dailyTask
    },

    async postDailyTask(Longtask, DailyTaskName, planned_time, n_questions, questions_set ) {
        const resp = await axios.post('/dailytasks', {
            data: {
                Longtask: Longtask,
                DailyTaskName: DailyTaskName,
                planned_time: planned_time,
                n_questions: n_questions,
                questions_set: questions_set
            }
        })
        return 'ok'

    },

    getDailyTaskByLongTask(longTaskId) {
        return this.currentDailyTaskListByLongTaskID = this.DailyTaskListCache.filter((dailytask) => {
            return dailytask.Longtask == longTaskId
        })

    },

    countAnswerNumber(Answer) {
        if (Answer == true) {

            this.trueAnswerNumber++

        }else {

            this.falseAnswerNumber++

        }
    },

    async updateDailyTaskState(id, accuracy) {

        const resp = await axios.put(`/dailytasks/${id}`, {
            data: {
                daily_state: true,
                accuracy: accuracy,
            }
        })
        return 'ok'

    },
    async deleteDailyTask(id) {

        const resp = await axios.delete(`/dailytasks/${id}`, {
            data: {
                daily_state: true
            }
        })
        return 'ok'

    },
    removeRecord() {
        this.trueAnswerNumber = 0
        this.falseAnswerNumber = 0
    }


}))
