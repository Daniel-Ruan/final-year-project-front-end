import { defineStore } from "pinia"
import axios from 'axios'

export type PracticeRecord = {
    id: number,
    question: number,
    dailytask: number,
    status: string
}

type PracticeRecordStore = {
    practiceRecordList: PracticeRecord[],
    getPracticeRecords: () => void,
    postPracticeRecord: (id: number, status: string) => Promise<string>,
}

export const usePracticeRecordStore = defineStore('practiceRecord', (): PracticeRecordStore => ({
    practiceRecordList: [],
    async getPracticeRecords() {
        const resp = await axios.get('/practice-records?pagination[limit]=10000')
        const practiceRecordList = resp.data.data
        this.practiceRecordList = practiceRecordList
    },
    async postPracticeRecord(id, status) {
        const resp = await axios.post('/practice-records', {
            data: {
                question: id,
                status: status
            }

        })
        return 'ok'
    }
}))