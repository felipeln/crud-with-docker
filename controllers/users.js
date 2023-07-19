
const User = require('../models/user')




// * CRUD controllers
// ? Create
    exports.createUser = async (req,res,next) => {
        const {name,email} = req.body
        User.create({
            name: name,
            email: email
        })
        .then(result => {
            console.log('user created')
            // res.status(201).json({message: 'User created successfully', user: result})
            req.flash('registered', 'new user has been registered')
            res.status(201).redirect('/register')
        })
    }
// ? Read
    // get all users
    exports.getUsers = async (req,res, next) => {
        User.findAll()
            .then(async users => {
                // res.status(200).json({users: users})
                let msg = req.flash('deleted')
                res.status(200).render('index', {users: users,  page_name: 'users', msg})
            })
            .catch(err => {
                console.log(err)
            })
    }
    //* get user by id to edit
    exports.getUser = async (req,res,next) => {
        const {userId} = req.params
        User.findByPk(userId)
            .then(user => {
                if(!user){
                    return res.status(404).json({message: 'User not found'})
                }
                // return res.status(200).json({user: user})
                let msg = req.flash('edited')
                res.status(200).render('edit',{user: user, page_name:'edit', msg})
            })
            .catch(err => {
                console.log(err);
            })

    }

// ? Update
    // find user and update
    exports.updateUser = async (req,res,next) => {
        const {userId} = req.params
        const { updatedName, updatedEmail} = req.body
        User.findByPk(userId)
            .then(user => {
                if(!user){
                    res.status(404).json({messa: 'user not found'})
                }
                user.name = updatedName
                user.email = updatedEmail
                return user.save()
            })
            .then(result => {
                req.flash('edited', `${result.name} was edited`)
                // res.status(200).json({message: 'User updated', user: result})
                res.status(200).redirect(`/users/edit/${result.id}`)
            })
            .catch(err => {
                console.log(err);
            })

    }

// ? Delete
    // find user and delete
    exports.deleteUser = async (req,res,next) => {
        const {userId} = req.params
        User.findByPk(userId)
            .then(async user => {
                if(!user){
                    res.status(404).json({message: 'user not found'})
                }
                req.flash('deleted',`${user.name} was deleted`)
                return user.destroy({
                    where: {
                        id: userId
                    }
                })
            })
            .then(async result => {
                res.status(204).redirect('/')
            })
            .catch(err => {
                console.log(err);
            })
    }
