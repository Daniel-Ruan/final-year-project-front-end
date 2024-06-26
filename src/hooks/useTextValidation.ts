export type TextType = 'email' | 'username' | 'password' | 'age' | 'gender' |'none'
const useTextValidation = (content: string, type: TextType): string => {
  if (type == 'email') {
    const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (content.trim().length == 0) {
      return 'Email can not be empty'
    }
    else if (!emailReg.test(content)) {
      return 'Invalid Email, e.g.: abc@123.com'
    }
    else {
      return ''
    }
  }
  else if (type == 'username') {
    if (content.trim().length == 0) {
      return 'Username can not be empty'
    }
    // else if (content.trim().length > 8) {
    //   return 'Username length should not be more than 8 chars!'
    // }
    else {
      return ''
    }
  }
  else if (type == 'password') {
    const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,100}$/
    if (content.trim().length == 0) {
      return 'Password can not be empty'
    }
    else if (!pwdRegex.test(content)) {
      return 'Password should be stronger!'
    }
    else {
      return ''
    }
  }
  else {
    return ''
  }
}


export default useTextValidation