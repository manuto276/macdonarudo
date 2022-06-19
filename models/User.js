const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Order = require('./Order')

/*
    ID
	Dati autenticazione passport.js
	Data di nascita
	Ruolo
	Array ID ordini (se sei cuoco sono gli ordini presi in carico, se sei cliente sono gli ordini effettuati, se sei admin null)
*/

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            validate: {
                validator: 
                // Arrow function would not work
                async function(email) {
                    // this.constructor is the User model, this is the schema. 
                    const user = await this.constructor.findOne({email: email})
                    if(user){
                        // if the email is already used by the same user that is trying to use it it's ok
                        if(user.id === this.id){
                            return true
                        }
                        // otherwise another use has the same email, and it's not ok
                        return false
                    }
                    // if no user is found with this email, it's ok
                    return true
                },
                message: () => 'This email is already in use'
            }
        },
        name: {
            type: String,
            required: true
        },
        bdate: {
            type: Date,
            required: true,
            validate: {
                validator:
                    async function(bdate){
                        const today = new Date(Date.now())
                        const averageSecondsInAYear = 31557600 // 60*60*24*365.25
                        const secondsSinceThen = (today.getTime() - bdate.getTime())/1000
                        // you're underage bro...
                        if(secondsSinceThen <  averageSecondsInAYear * 18){
                            return false
                        }
                        // you're adult nice
                        return true
                    },
                message: () => 'Underage'
            }
        },
        creationDate: {
            type: Date,
            required: true,
            default: Date.now()
        },
        role: {
            type: String,
            required: true,
            enum: ['customer', 'admin', 'cook'],
            default: 'customer'
        },
        order_ids: {
            type: [mongoose.Types.ObjectId],
            default: [],
            ref: 'Order'
        },      
        password: {
            type: String,
            required: true
        },
    }
)

// pre is a method that calls a middleware *before* an event, in this case the save
// event. Before saving the user, we will hash their password
userSchema.pre('save', function(next){
    // if the password was not modified, it means that it is already
    // saved and that it was not updated in this session. No need to re-hash it, just
    // next() to the save function 
    if(!this.isModified('password')){ // (this refers to the document that we are saving)
        return next()
    }
    // if the password is modified it means that the user is new or that they are updating
    // their password, hence we need to hash the password since it's in plain text
    bcrypt.hash(this.password, 10, (error, hashedPassword) => {
        if(error){
            return next(error)
        }
        this.password = hashedPassword
        next()        
    })
})

// function to compare the received plain password and saved hashed password
userSchema.methods.comparePassword = function(password, callback) {
    // password is plain, this.password is already encrypted
    bcrypt.compare(password, this.password, (error, isMatch) => {
        if(error){
            return callback(error)
        }
        // false is the failed user, null is the error
        if(!isMatch){
            return callback(null, false)
        }
        // this is the user, null is the error
        return callback(null, this)
    })
}

module.exports = mongoose.model('User', userSchema)