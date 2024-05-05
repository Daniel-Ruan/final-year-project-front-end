import { defineStore } from "pinia";
import axios from 'axios';

export type Book = {
    b_id: number,
    b_name: string,
    b_category: string,
    b_description: string,
    b_cover: string,
    b_release_date: string,
    b_author: string,
    pdf: string
}

export type BookDetail = {
    b_id: number,
    b_name: string,
    b_category: string,
    b_description: string,
    b_cover: string,
    b_images: string[],
    b_release_date: string,
    b_author: string,
    b_questions: number[],
    pdf: string
}

type BookStore = {
    currentBook: BookDetail,
    currentBookList: Book[],
    bookDetailCache: BookDetail[],
    bookListCache: Book[],
    getBook: (id: number) => void,
    clearCurrentBook: () => void,
    resetCurrentBookList: () => void,
    getBookList: () => void,
    getBookListByCategory: (category: string) => Book[],
    getBookListSlice: (start: number, size: number) => Book[],
    getBooksByIDs: (ids: number[]) => Book[],

}

export const useBookStore = defineStore('books', (): BookStore => ({
    currentBook: {
        b_id: -1,
        b_name: '',
        b_category: '',
        b_description: '',
        b_cover: '',
        b_images: [],
        b_release_date: '',
        b_author: '',
        b_questions: [],
        pdf: ''
    },
    currentBookList: [],
    bookDetailCache: [],
    bookListCache: [],
    async getBookList() {
        const resp = await axios.get(`/books?pagination[limit]=100`)
        const books = resp.data.data
        this.bookListCache = books
        this.currentBookList = books
    },

    async getBook(id) {
        let book: BookDetail | undefined = this.bookDetailCache.find((b) =>{
            return b.b_id == id
        })
        if (!book) {
            const resp = await axios.get(`/books/${id}` )
            book = resp.data.data
            if (book) {
                this.bookDetailCache.push(book)
            }
        }
        if (book) {
            this.currentBook = book
        }
        return book  
    },

    clearCurrentBook() {
        this.currentBook = {
            b_id: -1,
            b_name: '',
            b_category: '',
            b_description: '',
            b_cover: '',
            b_images: [],
            b_release_date: '',
            b_author: '',
            b_questions: [],
            pdf: ''
        }
    },

    resetCurrentBookList() {
        this.currentBookList = this.bookListCache
    },

    getBooksByIDs(ids) {
        return this.bookListCache.filter((book) => {
            return ids.includes(book.b_id)
        })
    },

    getBookListByCategory(category) {
        if (category == 'all') {
            this.currentBookList = this.bookListCache
            return []
        }
        this.currentBookList = this.bookListCache.filter((book) => {
            return book.b_category == category
        })
        return []

    },
    getBookListSlice(start, size) {
        if (start > this.currentBookList.length) {
            return []
        }
        else {
            return this.currentBookList.slice(start, start + size)
        }
    }

}))