const BASE_URL = "https://authencation.vercel.app/api/todo"

const API_ENPOIT = {
    GET : (id) => `${BASE_URL}/get?id=${id}`,
    LIST :() => `${BASE_URL}/list`,
    CREATE : () => `${BASE_URL}/create` ,
    UPDATE : (id) => `${BASE_URL}/update?id=${id}`,
    DELETE : (id) => `${BASE_URL}/delete?id=${id}`
}

export async function ListTodo(){
    try {
        const response = fetch(API_ENPOIT.LIST())
        const data = ( await response).json()
        if(typeof data === 'tring'){
            throw new Error(data)
        }
        return data
    }catch(err){
        console.log(err)
    }
}

export function createToOne(name){
    return fetch(API_ENPOIT.CREATE(),{
        method : "POST",
        body : JSON.stringify({name}),
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
}

export function updateTodo(id,name){
    return fetch(API_ENPOIT.UPDATE(id),{
        method : "POST",
        body : JSON.stringify({name}),
        headers :{
            "Content-Type" : "application/json"
        }
    }).then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
}

export function deleteTodo(id,name){
    return fetch(API_ENPOIT.DELETE(id),{
        method : "POST",
        body : JSON.stringify({name}),
        headers :{
            "Content-Type" : "application/json"
        }
    }).then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
}