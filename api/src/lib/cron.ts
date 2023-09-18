import cron from 'node-cron'

// trigger map update event every 5 seconds
export const mapUpdateTask = cron.schedule(
    '*/5 * * * * *',
    () => {
        console.log('running a task every 5 seconds')
    },
    {
        scheduled: false,
    }
)

export let mapUpdateTaskRunning = false

export const startMapUpdateTask = () => {
    console.log('starting map update')
    mapUpdateTask.start()
    mapUpdateTaskRunning = true
}

export const stopMapUpdateTask = () => {
    console.log('stopping map update')
    mapUpdateTask.stop()
    mapUpdateTaskRunning = false
}
