const db = require('../dbConfig/init');

class Present {
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.present_name = data.present_name;
        this.present_description = data.present_description;
        this.present_price = data.present_price;
        this.present_link = data.present_link;
        this.present_priority = data.present_priority;
        this.present_occasion = data.present_occasion;
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await db.query(`SELECT * FROM presents;`);
                let presents = data.rows.map(p => new Present(p));
                resolve(presents);
            }
            catch(err) {
                reject(`Presents not found.`);
            };
        });
    };

    static findPresentById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await db.query(`SELECT *
                                            FROM presents
                                            WHERE id = $1;`, [id]);
                let present = new Present(data.rows[0]);
                resolve(present);
            }
            catch(err) {
                reject(`Present ${id} not found.`)
            };
        });
    };

    static findPresentByUserId(id, type) {
        return new Promise(async (resolve, reject) => {
            try {
                let data;
                if(type !== 'all'){
                    data = await db.query(`SELECT * FROM presents WHERE user_id=$1 AND present_occasion=$2;`, [ id, type ]);
                } else {
                    data = await db.query(`SELECT * FROM presents WHERE user_id=$1`, [ id ]);
                }
                let presents = data.rows.map(p => new Present(p));
                resolve(presents);
            }
            catch(err) {
                reject(`Presents not found for user ${id}.`);
            }
        })
    }

    //create
    static create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const presentUser = data.user_id;
                const presentName = data.present_name;
                const presentDesc = data.present_description;
                const presentPrice = data.present_price;
                const presentLink = data.present_link;
                const presentPriority = data.present_priority;
                const presentType = data.present_occasion;
                let newPresentData = await db.query(`INSERT INTO presents (
                    user_id, 
                    present_name, 
                    present_description, 
                    present_price, 
                    present_link, 
                    present_priority,
                    present_occasion
                ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, 
                [ 
                    presentUser, 
                    presentName,
                    presentDesc, 
                    presentPrice, 
                    presentLink, 
                    presentPriority,
                    presentType 
                ]);
                let newPresent = new Present({...newPresentData.rows[0]});
                resolve(newPresent);
            }
            catch(err) {
                reject(`New present could not be created.`);
            };
        });
    };

    //update
    update(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const presentPrice = data.present_price;
                const updatedPresentData = await db.query(`UPDATE presents SET present_price = $1 WHERE id = $2;`, [presentPrice, this.id]);
                let updatedPresent = new Present({ ...updatedPresentData.rows[0] });
                resolve(updatedPresent);
            }
            catch (err) {
                reject(`Present ${this.id} could not be updated`);
            };
        });
    };

    //destroy
    destroy() {
        return new Promise(async (resolve, reject) => {
            try {
                await db.query(`DELETE FROM presents WHERE id=$1 RETURNING id;`, [ this.id ]);
                resolve(`Present ${this.id} successfully deleted`);
            }
            catch(err) {
                reject(`Present could not be deleted.`);
            };
        });
    };
};

module.exports = Present;

