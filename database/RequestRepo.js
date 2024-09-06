import { request } from 'express';
import Database from './Database.js';


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
    
    async addRequest (reqArray) {
      const res = await this.db.run (`
        INSERT INTO requests (status, time, title, type, description, location, contact) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, reqArray);

      return result.lastID;
    }
    
}

export default RequestRepository;