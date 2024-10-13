export const validateMinMax = (str,min,max,val) => {
    if(val.length < min || val.length > max){
        return {isSuccess:false, errorMessage: `${str} requires ${min} letters or max ${max} letters`}
    } return {isSuccess:true, errorMessage:''}
}

export const validateEmail = (str) => {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)){
    return {isSuccess:true, errorMessage:''}
  }
    return {isSuccess:false, errorMessage:'email is not valid'}
}

//To check a password minimum 8 characters which contain at least one numeric digit, one uppercase and one lowercase letter
export const validatePassword = (str) => {
    if(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()-+]).{8,}$/.test(str)){
        return {isSuccess:true, errorMessage:''}
    } 
    return {isSuccess:false, errorMessage:'Password is not Valid'}
}


export const confirmPassword = (pass, confirmedPass) => {
    if(pass === confirmedPass){
        return {isSuccess:true, errorMessage:''}
    } return {isSuccess: false, errorMessage:"Passwords do not match"}
}

export const validateFileType = (file) => {
    if(!file.name.match(/\.(jpg|jpeg|png|gif)$/)){
        return false
    } return true
}
