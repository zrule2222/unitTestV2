import axios from 'axios';
import "babel-polyfill";
import router from '../router/index.js'

export const articles = {}


articles.http = axios.create({ baseURL: "http://127.0.0.1:5022/api" })

articles.getAuthors = async function(value) {
  const res = await this.checkAuthentification()
  if(res != 500){
  let response = null
  if(value){
    response = await this.http.get(`/author/${value}`)
  }
  else{
    response = await this.http.get(`/authors`)
  }
    return response.data
}
  }
  articles.getArticles = async function(value) {
    const res = await this.checkAuthentification()
    if(res != 500){
    let response = null
    if(value){
    response = await this.http.get(`/article/${value}`)
    }
    else{
      response = await this.http.get(`/articles`)
    }
    return response.data
  }
  }

  articles.getArticlesByPage = async function(totalPages, limit, searchedValue) {
    const res = await this.checkAuthentification()
    if(res != 500){
    let response = null
    if(searchedValue){
    response = await this.http.get(`/articlePaginationSearch/${totalPages}/${limit}/${searchedValue}`)
    }
    else{
      response = await this.http.get(`/articlePagination/${totalPages}/${limit}`)
    }
    return response
  }
  }
  articles.getArticlesByPageCount = async function(totalPages, limit, searchedValue) {
    const res = await this.checkAuthentification()
    if(res != 500){
    let response = null
    if(searchedValue){
    response = await this.http.get(`/articlePaginationSearchPages/${totalPages}/${limit}/${searchedValue}`)
    }
    else{
      response = await this.http.get(`/articlePaginationPages/${totalPages}/${limit}`)
    }
    return response
  }
  }
  articles.deleteArticle = async function(id) {
    const res = await this.checkAuthentification()
    if(res != 500){
    await this.http.delete(`/article/${id}`)
    }
  }

  articles.updateArticle = async function(id, title, content) {
    const res = await this.checkAuthentification()
  if(res != 500){
    await this.http.put(`/article/${id}`, {
      title: title,
      body: content,
    })
  }
  }
  articles.postArticle = async function(article) {
    const res = await this.checkAuthentification()
  if(res != 500){
    await this.http.post("/articles", article)
  }
  }
  articles.login = async function(loginData) {
   return await this.http.post("/auth/login", loginData)
  }
  articles.register = async function(registerData) {
    return await this.http.post("/auth/register", registerData)
   }
   articles.logout = async function() {
    await this.http.post("/auth/logout","",{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    })
    router.push({name:'Home', params:{message:"Loged out successfully"}})
   }
   articles.checkAuthentification = async function() {
    try{
     await this.http.get("/auth/status", {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    })
    return 200
  }
  catch(err){
    localStorage.setItem('messageToShow',"your session has expired")
    router.push({name:'Home', params:{message:"your session has expired"}})
    return 500
  }
   }

  export default{
    install(Vue){
      Vue.prototype.$articles = articles
    }
  }
