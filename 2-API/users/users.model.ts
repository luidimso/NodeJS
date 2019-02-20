import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import {environment} from '../common/environment'

export interface User extends mongoose.Document{
  name: string,
  email: string,
  password: string,
  matches(password: string): boolean
}

export interface UserModel extends mongoose.Model<User>{
  findByEmail(email: string, projection?: string): Promise<User>
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 80,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  gender: {
    type: String,
    required: false,
    enum: ['M', 'F']
  }
})

const hashPassword = (obj, next)=>{
  bcrypt.hash(obj.password, environment.security.saltRounds).then(hash=>{
    obj.password = hash
    next()
  }).catch(next)
}

const saveMiddleware = function (next){ //Hash de senha para insert
  const user: User = this
  if(!user.isModified('password')){
    next()
  } else{
    hashPassword(user, next)
  }
}

const updateMiddleware = function (next){ //Hash de senha para update
  if(!this.getUpdate().password){
    next()
  } else{
    hashPassword(this.getUpdate(), next)
  }
}

userSchema.pre('save', saveMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)
userSchema.pre('update', updateMiddleware)

userSchema.statics.findByEmail = function(email: string, projection: string){
  return this.findOne({email}, projection)
}

userSchema.methods.matches = function(password: string): boolean {
  if(password == this.password){
    return true
  }
  else{
    return false
  }
}

export const User = mongoose.model<User, UserModel>('User', userSchema)
