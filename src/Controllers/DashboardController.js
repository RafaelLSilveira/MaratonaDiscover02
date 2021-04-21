const Job = require('../Model/Job')
const Profile = require('../Model/Profile')
const { remainingDays, calculateBudget } = require('../Utils/JobUtils')

module.exports = {
    async index(_, response) {
        const jobs = await Job.get()
        const profile = await Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            const remaining = remainingDays(job)
            const status = remaining <= 0
                ? 'done'
                : 'progress'

            statusCount[status] += 1
            
            jobTotalHours = status === 'progress'
                ? jobTotalHours + Number(job.dailyHours)
                : jobTotalHours

            return {
                ...job,
                remaining,
                status,
                budget: calculateBudget(job, profile.valueHour)
            }
        })

        const freeHours = profile.hoursPerDay - jobTotalHours

        return response.render('index', { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }
}