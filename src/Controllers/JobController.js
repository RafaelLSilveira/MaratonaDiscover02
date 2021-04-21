const Job = require('../Model/Job')
const Profile = require('../Model/Profile')
const { remainingDays, calculateBudget } = require('../Utils/JobUtils')

module.exports = {
    async save(request, response){
        // request.body { name: 'rafael', 'daily-hours': '0.7', 'total-hours': '4' }
        const {
            body: {
                name,
                'daily-hours': dailyHours,
                'total-hours': totalHours
            }
        } = request

        await Job.create({
            name,
            dailyHours,
            totalHours,
            createdAt: Date.now()
        })
    
        return response.redirect('/')
    },
    create(_, response){
        return response.render('job')
    },
   async show(request, response){
        const jobId = request.params.id
        const jobs = await Job.get()
        const profile = await Profile.get()

        const job = jobs.find(({id}) => Number(id) === Number(jobId))
        
        if(!job) {
            return response.send('#404 Job not found') 
        }

        job.budget = calculateBudget(job, profile.valueHour)

        return  response.render('job-edit', { job })
    },
    async update(request, response){
        const {
            params: {
                id: jobId
            },
            body: {
                name,
                'total-hours': totalHours,
                'daily-hours': dailyHours
            }
        } = request

        const updatedJob = {
            id: jobId,
            name,
            totalHours,
            dailyHours
        }

        await Job.update(updatedJob)

        response.redirect('/job/' + jobId)
    },
    async delete(request, response){
        const jobId = request.params.id
        
        await Job.delete(jobId)

        return response.redirect('/')
    }
}