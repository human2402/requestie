import { request } from 'express';
import Database from './Database.js';


let sessionExpiration = 5; 

function addMonths(date, months) {
  let result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

function formatDateToDDMMYYHHMM(date = new Date()) {
  // Extract date components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-based
  const year = String(date.getFullYear()).slice(2);  // Last two digits of the year

  // Extract time components
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Combine into the desired format
  return `${day}.${month}.${year} ${hours}:${minutes}`;
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

  
    
  async createRequest (reqArray) {
    let fullAr = [
      ...Object.values(reqArray),
      'Pending',
      formatDateToDDMMYYHHMM(),
    ]
    console.log (fullAr)
    const res = await this.db.run (`
      INSERT INTO requests (
        title, 
        type,
        location, 
        description, 
        contact,
        status,
        time
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, fullAr);

    return res.lastID;
  }
    
}

export default RequestRepository;