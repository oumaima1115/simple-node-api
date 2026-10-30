function validatePassword(password) {
    //password should contain uppercase, lowercase, number, special character and minimum 8 characters
    // const passwordRegrex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordRegrex = /^[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegrex.test(password);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = { validatePassword, validateEmail };