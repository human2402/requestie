import { request } from 'express';
import Database from './Database.js';


let sessionExpiration = 5; 

function addMonths(date, months) {
  let result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

class RequestRepository {
    constructor(database) {
        this.db = database;
    }
    
    async getAllRequests(limit) {
      let query = 'SELECT * FROM requests';
      const params = [];

      
  
      if (limit) {
        query += ' LIMIT ?';
        params.push(limit);
      }
  
      return this.db.all(query, params);
  }

  async getUserByUsernameWithPass (username) {
    let user = this.db.all (`
      SELECT * FROM users WHERE username = ?
    `, username)
    console.log (user)
    return user;
  }

  async createSession (username, role) {
    let currentDate = new Date();
    let result = await this.db.run (`
      INSERT INTO sessions (username, role, validtill) 
      VALUES (?, ?, ?)
    `, [
      username, 
      role, 
      addMonths(currentDate, sessionExpiration),
    ]);

    return result.lastID;
  }

  
    
    async addRequest (reqArray) {
      const res = await this.db.run (`
        INSERT INTO requests (status, time, title, type, description, location, contact) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, reqArray);

      return result.lastID;
    }
    
}

export default RequestRepository;