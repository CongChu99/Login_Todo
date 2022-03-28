import * as API from './login.model.js'
import * as Storage from './login.Storage.js'

const form = document.getElementsByClassName('main')
form.onsubmit = () => {
    return false
}

const button = document.getElementById("login-btn")
button.addEventListener('click',()=>{
    const userName = document.getElementById('username')
    const passWord = document.getElementById('password')

    const obj = {
        "username" : userName.value,
        "password" : passWord.value
    }
    API.loginUser(obj).then(dt =>{
        //console.log(dt)
        if(dt.length === 0){
            console.log('ccc')
        } else {
            //console.log(dt)
            Storage.setItemStorage(dt)
            const todos =  API.todoList().then(el=>{
            if(el.length ===0){
                alert()
            }else{
                for(let i =0 ;i < el.length;i++){
                    JSON.stringify(el[i])
                    Storage.getItemStorage()
                    console.log(dt.user_id)
                    if(dt.user_id === el[i].id)
                    {
                        window.location = "http://127.0.0.1:5500/Login_Api/public/todo.html"
                    }
                }
             }
            })
        }

    })      
    // alert()
})
const create = document.getElementById('pca')
create.addEventListener('click', () =>{
    window.location = "http://127.0.0.1:5500/Login_Api/public/create.html"
})




