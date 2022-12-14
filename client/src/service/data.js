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
        const data =  this.http.fetch(`/courses/${courseId}`, {  
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }
    

    async getStudentsNum(courseId) {
        const data =  this.http.fetch(`/courses/${courseId}/num`, {   
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


    async deleteJoin(courseId) {
        const data =  this.http.fetch(`/courses/${courseId}/joined/`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
        return data;
    }


    

    async getJoinInfo(courseId) {
        const data =  this.http.fetch(`/courses/${courseId}/joined/`, {    
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async getUserInfo() {
        const data =  this.http.fetch(`/courses/account/profile/info`, {    
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }
    

    async getJoinedCourses() {
        const data =  this.http.fetch(`/courses/account/profile`, {    
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    async getJoinedCourseswithDepartment(depId) {
        const data =  this.http.fetch(`/courses/account/profile/departments/${depId}`, {    
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    
    async getCourseInfo(courseId) {
        const data =  this.http.fetch(`/courses/${courseId}/info`, {    
            method: 'GET',
            headers: this.getHeaders(),
        });
        return data;
    }

    
    async getIfCodeSent(email, code) {
        const data =  this.http.fetch(`/auth/login/code`, {    
            method: 'POST',
            body: JSON.stringify({email, code}),
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