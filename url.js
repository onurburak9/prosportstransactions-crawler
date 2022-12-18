const BASE_URL = "https://www.prosportstransactions.com/basketball/Search/SearchResults.php"

const getURLs = (players, teams, config, dates) => {
    const urls = []
    const params = {
        player: '',
        team: '',
        dates,
        config
    }
    if (players.length && teams.length) {
        for (let player of players) {
            for (let team of teams) {
                params.player = player
                params.team = team
                urls.push(buildURL(params))
            }
        }
    } else if (players.length) {
        for (let player of players) {
            params.player = player
            urls.push(buildURL(params))
        }
    } else if (teams.length) {
        for (let team of teams) {
            params.team = team
            urls.push(buildURL(params))
        }
    } else {
        urls.push(buildURL(params))
    }

    return urls
}

const buildURL = ({ player, team, config, dates }) => {
    let baseParams = `Player=${player}&Team=${team}&BeginDate=${dates.beginDate}&EndDate=${dates.endDate}`

    let transactionTypes = ''
    for (const key in config) {
        if (config[key]) {
            transactionTypes += `${key}=yes&`
        }
    }

    return {
        player,
        team,
        config,
        dates,
        address: `${BASE_URL}?${baseParams}&${transactionTypes}start=0`
    }
}

export default {
    getURLs
}