const Database = require('../db/config')

module.exports = {
    async get(){
        const db = await Database()

        const data = await db.get(`SELECT * FROM profiles`)

        await db.close()    

        return {
            name: data.name,
            avatar: data.avatar,
            monthlyBudget: data['monthly_budget'],
            hoursPerDay: data['hours_per_day'],
            vacationPerYear: data['vacation_per_year'],
            valueHour: data['value_hour'],
            daysPerWeek: data['days_per_week']
        }
    },
    async update(newData){
        const db = await Database()

        db.run(`UPDATE profiles SET
            name = '${newData.name}',
            avatar = '${newData.avatar}',
            monthly_budget = ${newData.monthlyBudget},
            hours_per_day = ${newData.hoursPerDay},
            vacation_per_year = ${newData.vacationPerYear},
            value_hour = ${newData.valueHour},
            days_per_week= ${newData.daysPerWeek}
        `)

        await db.close()
    }
}