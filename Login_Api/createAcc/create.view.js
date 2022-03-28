import * as API from "../login/login.model.js"


const create = document.getElementById('btn-login')
create.addEventListener('click',async() =>{
    const fullName = document.getElementsByClassName('name')
    const passWord = document.getElementsByClassName('password')
    const userName = document.getElementsByClassName('username')
    const full = fullName[0].value
    const pass = passWord[0].value
    const user = userName[0].value
    const todo = await API.createToOne(full,pass,user)
    if(todo){
        alert('Ban đã đăng nhập thành công')
        window.location ="http://127.0.0.1:5500/Login_Api/public/login.html"
    } else {
        alert('errr')
    }
})