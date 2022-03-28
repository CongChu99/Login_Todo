const BASE_URL =`https://authencation.vercel.app/api`

const API_ENPOINT = {
    LOGIN :() => `${BASE_URL}/auth/login`,
    LIST : () => `${BASE_URL}/user/list`,
    CREATE : () =>`${BASE_URL}/user/create`
}

export async function todoList(){
    try {
        const respont = fetch(API_ENPOINT.LIST())
        const data = (await respont).json()
        if(typeof data === 'string') {
            throw new Error(data)
        }
        return data
    }catch(err){
        console.log(err)
        return []
    }
}
export async function loginUser(name){
    try{
        const options = {
            method : 'POST',
            body : JSON.stringify(name),
            headers: {
                "Content-Type" : "application/json"
        }
    }
        const response = fetch(API_ENPOINT.LOGIN(),options)
        const data = (await response).json()
        if(typeof data === "string" ){
            throw new Error(data)
        }
        return data
    }catch(err){
        console.log(err)
        return{}
    }
}
export function createToOne(full_name,password,username){
    return fetch(API_ENPOINT.CREATE(),{
        method : "POST",
        body : JSON.stringify({full_name,password,username}),
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
}