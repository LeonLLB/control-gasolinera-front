

export const genPassword = (passwordLength = 5) => {
    const charString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

    let password = ''
    for (let i = 0; i < passwordLength; i++) {
      password += charString.charAt(Math.floor(Math.random() * (charString.length)));
    }
    return password
}