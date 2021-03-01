module.exports.validateRegisterInput = (
    username = '',
    email = '',
    password = '',
    confirmPassword = ''
) => {
    const errors = {};

    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }

    if (email.trim() === '') {
        errors.email = 'Email must not be empty'
    } else {
        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!email.match(regEx)) {
            errors.email = 'Email must be valid email address'
        }
    }

    if (password === '') {
        errors.password = 'Password must not be empty'
    } else if (password !== confirmPassword) {
        errors.password = ' Passwords must match'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports.validateCreatePost = (
    body = ''
) => {
    const errors = {};

    if (body.trim() === '') {
        errors.body = 'Body must not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports.validateLoginInput = (
    username = '',
    password = '',
) => {
    const errors = {};

    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }

    if (password.trim() === '') {
        errors.password = 'Password must not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

