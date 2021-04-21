module.exports = {
    remainingDays(job){
        const remainingDays = (job.totalHours / job.dailyHours).toFixed()
    
        const createdDate = new Date(job.createdAt)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDate = createdDate.setDate(dueDay)
        const timeDiffInMs = dueDate - Date.now()
    
        const dayInMis = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMis)
    
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job.totalHours
}