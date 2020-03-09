export const isEmail = (email) =>{
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim().toLowerCase())){
        return true
    }
    return false
}