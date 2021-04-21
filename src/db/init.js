const Database = require('./config')

const initDb = {
async init(){
    const db = await Database()

    await db.exec(`CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
    )`)

    await db.exec(`CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
    )`)

    db.run(`INSERT INTO profiles (
        name,
        avatar,
        monthly_budget,
        days_per_week,
        hours_per_day,
        vacation_per_year,
        value_hour
    ) VALUES (
        "Rafael Silveira",
        "https://avatars.githubusercontent.com/u/49955909?v=4.com/u/49955909?v=4",
        5000,
        5,
        5,
        5,
        70
    );`)

    db.run(`INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "Pizzaria Guloso",
        2,
        1,
        1617514376018
    );`)

    db.run(`INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "One Two Projects",
        3,
        46,
        1617514376018
    );`)

    await db.close()
    }
}

initDb.init()