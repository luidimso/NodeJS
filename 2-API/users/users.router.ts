import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'
import {NotFoundError} from 'restify-errors'

class UsersRouter extends Router {
  applyRoutes(application:  restify.Server){
    application.get('/users', (req, resp, next)=>{ //Selecionar todos
      User.find().then(users=>{
        resp.json(users)
        return next()
      }).catch(next)
    })


    application.get('/users/:id', (req, resp, next)=>{ //Selecionar por filtro
      User.findById(req.params.id).then(user=>{
        if(user){
          resp.json(user)
          return next()
        }

        resp.send(404)
        return next()
      }).catch(next)
    })


    application.post('/users', (req, resp, next)=>{ //Inserir
      let user = new User(req.body)

      user.save().then(user=>{
        user.password = undefined;
        resp.json(user)
        return next()
      }).catch(next)
    })


    application.put('/users/:id', (req, resp, next)=>{
      const options = {overwrite: true}
      User.update({_id:req.params.id}, req.body, options).exec().then(result=>{ //Atualização total
        if(result.n){
          return User.findById(req.params.id)
        }else{
          throw new NotFoundError('Documento não encontrado')
        }
      }).then(user=>{
        resp.json(user)
        return next()
      }).catch(next)
    })


    application.patch('/users/:id', (req, resp, next)=>{
      const options = {new: true}
      User.findByIdAndUpdate(req.params.id, req.body, options).then(user=>{ //Atualização parcial
        if(user){
          resp.json(user)
          return next()
        }else{
          resp.send(404)
          return next()
        }
      }).catch(next)
    })


    application.del('/users/:id', (req, resp, next)=>{
      User.remove({_id: req.params.id}).exec().then((cmdResult: any)=>{ //Apagar
        if(cmdResult.result.n){
          resp.send(204)
        }else{
          throw new NotFoundError('Documento não encontrado')
        }
        return next()
      }).catch(next)
    })
  }
}

export const usersRouter = new UsersRouter()
