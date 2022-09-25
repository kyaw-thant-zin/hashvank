
const error = {
    message: {
        require: 'This field is required.',
        email: 'Please enter a valid email address',
        min: 'Please enter at least 8 characters',
        confirm: 'The password confirmation does not match.',
        agree: 'Please agree with Terms & Coditions.',
        username: 'Username can only include letters, numbers, underscores and periods.'
    }
}

const Validation = {
    required: (value) => {
        const v = String(value).replace(/ /g, '')
        return v === '' ? { error: true, message: error.message.require }: null
    },
    requiredWithTag: (val, tag) => {
        if(tag === 'checkbox') {
            return val === false ? { error: true, message: error.message.require }: null
        }
    },
    isEmail: (email) => {
        return (/\S+@\S+\.\S+/.test(email)) === false ? { error: true, message: error.message.email }: null
    },
    isConfirmed: (str, confirmStr) => {
        return str !== confirmStr ? { error: true, message: error.message.confirm }: null
    },
    min: (val, min) => {
        return val.length < min ? { error: true, message: error.message.min }: null
    },
    username: (val) => {
        return (/\s/g.test(val)) === true ? { error: true, message: error.message.username } : null
    },
    error: error,
    reset: { error: false, message: '' }
}

export default Validation