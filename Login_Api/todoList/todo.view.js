import * as LoginAPI from "../login/login.model.js"
import * as Storage from "../login/login.Storage.js"
import * as API from "./todo.model.js" 
const dt = Storage.getItemStorage()

// if (dt = {}){
//     window.location = "http://127.0.0.1:5500/Login_Api/public/login.html"
// }
// đăng xuất
const logOut = document.getElementById('Name')
logOut.addEventListener('click',() =>{
    const check = confirm('Are you sure ')
    if(check){
        localStorage.clear()
        window.location = "http://127.0.0.1:5500/Login_Api/public/login.html"
    }
})

// List 
const todos = API.ListTodo().then(dt =>{
    if(dt.length ===0){
        console.log('errr')
    } else{
        //console.log(dt)
        rederTodo(dt)
    }
})

/// render
function rederTodo(array){
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    array.forEach(el => CreateOneTodo(el.name, el.id));
}
function CreateOneTodo(name,id){
    const tbody = document.querySelector("tbody")
    const tr = document.createElement("tr")
    const listTr = document.querySelectorAll("tr")
    const index = listTr.length
    tr.innerHTML += `
    <th scope="row">${index}</th>
    <td>${name}</td>
    <td>
        <button id="btn-sort" type="button" class="btn btn-sm btn-warning mx-2" onclick="Edit('${id}')">Edit</button>
        <button id="btn-sort" type="button" class="btn btn-sm btn-danger mx-2" onclick="Delete('${id}')">Delete</button>
    </td>`

    document.Edit = (id) => {
        const name = prompt("Nhap vao ten moi: ");
        API.updateTodo(id, name)
            .then(data => {
                API.ListTodo().then(todos => {
                    rederTodo(todos);
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    }    

    document.Delete = (id) => {
        API.deleteTodo(id).then(
            data => {
                API.ListTodo().then(todos => {
                    rederTodo(todos);
                }).catch(err => console.log(err))
            }
        ).catch(err => console.log(err))
    }
    tbody.appendChild(tr)
}

const add = document.getElementById("btn-add")
add.addEventListener("click",async()=>{
    const form = document.getElementsByClassName("form-control")
    const data = form[0].value
    const todo = await API.createToOne(data)
    CreateOneTodo(data,todo.id)
})


//Xoá toàn bộ

const deleteAll = document.getElementById("btn-delete-all")
deleteAll.addEventListener("click",async() =>{
        rederTodo([])
})

//Search

const Search = document.getElementById("btn-search")
Search.addEventListener("click",async() =>{
    const form = document.getElementsByClassName("form-control")
    // API.ListTodo().then(todos =>{
    //     if(form[0].value === todos.name){
    //         rederTodo(form[0].vale)
    //     }
    // })

    // console.log(form[0].value)
    const todos = API.ListTodo().then(dt =>{
        if(dt.length ===0){
            console.log('errr')
        } else{
            const searchs = dt.filter(el =>{
                return el.name === form[0].value
            })
            rederTodo(searchs)
            // if(form[0].value === dt.name)
        }
    })
})


// sort
const Sort = document.getElementById("btn-sort")
Sort.addEventListener('click',async()=>{
    const todos = API.ListTodo().then(dt =>{
        if(dt.length ===0){
            console.log('errr')
        } else{
            const Sorts = dt.filter(el =>{
                return el
                 })
            Sorts.sort((a,b) => a.name - b.name)
            rederTodo(Sorts)
            }
    })
})

// Name
function userID(){
    const userId = document.getElementById("dropdownMenuButton1")
    // userId.innerHTML = `${dt.id}`
    LoginAPI.todoList().then(data =>{
        if(data.length===0){
            console.log('err')
        } else{
            const user = data.filter(el =>{
                return el.id.includes(dt.user_id)
            })
            // console.log(user[0].username)
            userId.innerHTML = `${user[0].username}`
        }
    })
}
userID()


