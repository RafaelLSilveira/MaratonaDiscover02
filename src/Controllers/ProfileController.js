const Profile = require('../Model/Profile')

module.exports = {
    async index(_, response){
       return response.render('profile', { profile: await Profile.get() })
    },
    async update(request, response){
        // request.body para pegar os dados
        const {
            body: {
                'vacation-per-year': vacationPerYear,
                'hours-per-day': hoursPerDay,
                'days-per-week': daysPerWeek,
                'monthly-budget': monthlyBudget
            }                
        } = request
        
        // definir quantas semanas tem num ano
        const weeksPerYear = 52

        // remover as semnas de férias do ano
        const weeksPerMonth = (weeksPerYear - vacationPerYear) / 12

        // quantas horas por semana estou trabalhando
        const weekTotalHours = hoursPerDay * daysPerWeek

        // total de horas trabalhadas em um mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

       const oldProfile = await Profile.get()

        await Profile.update({
            ...oldProfile,
            vacationPerYear,
            hoursPerDay,
            monthlyBudget,
            daysPerWeek,
            valueHour: monthlyBudget / monthlyTotalHours
        })

        return response.redirect('/profile')
    }
}