const Database = require('../db/config')

module.exports = {
    async get(){
        const db = await Database()

        const data = await db.all('SELECT * FROM jobs')

        await db.close()

        return data.map(item => ({
            id: item['id'],
            name: item['name'],
            dailyHours: item['daily_hours'],
            totalHours: item['total_hours'],
            createdAt: item['created_at']
        }))
    },
    async update(newJob){
        const db = await Database()

        db.run(`UPDATE jobs SET
            name = '${newJob.name}',
            daily_hours = ${newJob.dailyHours},
            total_hours = ${newJob.totalHours}
            WHERE id = ${newJob.id}
        `)

        await db.close()
    },
    async delete(jobId){
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${jobId}`)

        await db.close()
    },
    async create(newJob){
        const db = await Database()

        db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            '${newJob.name}',
            ${newJob.dailyHours},
            ${newJob.totalHours},
            ${newJob.createdAt}
        );`)

        await db.close()
    }
}