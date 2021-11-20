const db = require('../dbConfig');

class User {
    constructor(data){
        this.id = data.id
        this.username = data.username
        this.password = data.password
    }

    static create({ username, password }){
        console.log(username, password)
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`INSERT INTO users (username, password)
                                                VALUES ($1, $2) RETURNING *;`,[ username, password ]);
                let user = new User(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }

    static findByName(username){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT * FROM users
                                                WHERE username = $1;`,[ username ]);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }

    static findUserId(username){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(`SELECT id, username FROM users
                                                WHERE username = $1;`,[ username ]);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }
}

module.exports = User