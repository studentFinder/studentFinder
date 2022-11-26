export default class DataService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async getDepartments() {
        return this.http.fetch(`/courses/departments`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    async getCourses(search) {
        const query = search ? `?search=${search}` : '';
        return this.http.fetch(`/courses${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    async getCourseswithDepartment(depId, search) {
        const query = search ? `?search=${search}` : '';
        return this.http.fetch(`/courses/departments/${depId}${query}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    async getStudents(courseId) {
        const data =  this.http.fetch(`/coursess/${courseId}`, {    //url 앞에 /이거 빼먹지 않기.
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async postJoin(courseId) {
        const data =  this.http.fetch(`/courses/${courseId}`, {
            method: 'POST',
            headers: this.getHeaders(),
        });
        return data;
    }



    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }
}