import express, {Router, Request, Response } from 'express';

class UserController {
    async registration(req:Request, res:Response){

    }

    async login(req:Request, res:Response){
        
    }

    async check(req:Request, res:Response){
       const query = req.query
       res.json(query)
    }

    async getAll(req:Request, res:Response){
        
    }
    
    async getOne(req:Request, res:Response){
        
    }

    async update(req:Request, res:Response){
        
    }

    async delete(req:Request, res:Response){
        
    }
}

export default new UserController()