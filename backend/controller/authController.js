
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHnadler = require('express-async-handler')
const db = require('../models/index')
const { Op } = require('sequelize')


// Create user Model
const User = db.users
const Role = db.roles

// @desc GET show
// @route GET /api/users/:id
// @access Private
const show = asyncHnadler( async (req, res) => {
    const user = await User.findOne({ where: { id: 3 } })
    res.send(user)
})

// @desc POST signUp
// @route POST /api/users/sign-up
// @access Private
const signUp = asyncHnadler( async (req, res) => {

    const { firstName, lastName, tel, email, userName, password } = req.body

    if(!firstName || !lastName || !userName || !email || !password) {
        res.status(400).send({ error: { required: 'Please add all fields' } })
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExistsEmail = await User.findOne({ where: { email: email } })
    if(userExistsEmail) {
        res.status(400).send({ error: { emailExists: 'The email is already in use.' } })
        throw new Error('The email is already in use.')
    }

    const userExistsUserName = await User.findOne({ where: { userName: userName } })
    if(userExistsUserName) {
        res.status(400).send({ error: { userNameExists: 'The Username has already been taken.' } })
        throw new Error('The Username has already been taken.')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate remember token
    const rememberToken = await bcrypt.hash(firstName, salt)

    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        tel: tel,
        userName: userName,
        password: hashedPassword,
        status: 1,
        roleId: 3,
        rememberToken: rememberToken,
        refreshToken: ''
    }

    // Create user
    const user = await User.create(userData).catch(error => {console.log(error)}) 

    if(user) {

        // Generate refreshtoken
        const refreshToken = generateRefreshToken(user.uuid)
        await User.update({ refreshToken: refreshToken }, {
            where: {
                id: user.id,
            }
        })

        res.status(201).json({
            created: true
        })
    } else {
        res.status(400).send({ error: { invalid: 'Invalid account data.' } })
        throw new Error('Invalid account data')
    }
})

// @desc POST signIn
// @route POST /api/users/sign-in
// @access Private
const signIn = asyncHnadler( async (req, res) => {
    
    const cookies = req.cookies;
    const { id, password } = req.body

    const foundUser = await User.findOne({
        where: {
            [Op.or]: [
                { userName: id },
                { email: id }
            ]
        }
    })

    if(foundUser) {
        if((await bcrypt.compare(password, foundUser.password))) {

            const accessToken = generateAccessToken(foundUser.uuid)
            const userObj = foundUser.toJSON()
            const userInfo = {}
            for(const key in userObj) {
                if(key === 'uuid' || key === 'userName' || key === 'roleId' || key === 'firstName' || key === 'lastName' ) {
                    userInfo[key] = userObj[key]
                }
            }

            userInfo.accessToken = accessToken

            // Send authorization access token to user
            res.json({ userInfo })

        } else {
            res.status(400).send({ error: { wrongPassword: 'The password is incorrect.' } })
            throw new Error('The password is incorrect.')
        }
    } else {
        res.status(400).send({ error: { invalid: 'Wrong credentials.' } })
        throw new Error('Wrong credentials.')
    }

})

// Generate JWT
const generateRefreshToken = (uuid) => {
    return jwt.sign({
        uuid: uuid
    }, process.env.REFRESH_TOKEN_SECRET, {
        // expiresIn: '10s'
    })
}

// generate new accessToken
const generateAccessToken = (uuid) => {
    return jwt.sign({
        uuid: uuid
    }, process.env.ACCESS_TOKEN_SECRET, {
        // expiresIn: '10s'
    })
}

module.exports = {
    show,
    signUp,
    signIn,
}