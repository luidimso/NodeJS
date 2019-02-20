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

userSchema.pre('save', function (next){ //Hash de senha para insert
  const user: User = this
  if(!user.isModified('password')){
    next()
  } else{
    bcrypt.hash(user.password, environment.security.saltRounds).then(hash=>{
      user.password = hash
      console.log(user.password)
      next()
    }).catch(next)
  }
})

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
