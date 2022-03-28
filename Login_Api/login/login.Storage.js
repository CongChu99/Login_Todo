const tasks = ''
let storage = localStorage[tasks] === undefined ? localStorage[tasks] = JSON.stringify([]) : JSON.parse(localStorage[tasks])


export function setItemStorage(task){
    const obj = {
        id : task.id,
        user_id : task.user_id
    }

    storage = []
    storage.push(obj)
    localStorage[tasks]= JSON.stringify(task)
}
export function getItemStorage(){
    return storage
}