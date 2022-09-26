import {t} from "./SwitchLang";


const error = {
    message: {
        require: t('error.require'), 
        email: t('error.email'),
        min: t('error.min'),
        confirm: t('error.confirm'),
        agree: t('error.agree'),
        username: t('error.username')
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