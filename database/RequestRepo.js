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
    
    
}

export default RequestRepository;