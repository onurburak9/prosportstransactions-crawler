import yargs from 'yargs/yargs'
import urlHelper from './url.js'
import dataHelper from './data.js'

var argv = yargs(process.argv.slice(2))
    .coerce('player', function (arg) {
        let response = []
        switch (typeof arg) {
            case "string":
                response = [arg.split(" ").join("+")]
                break;
            case "object":
                response = arg.map(val => val.split(" ").join("+"))
                break;
            default:
                console.warn('Unknown player parameter')
                break;
        }
        return response
    }).coerce('team', function (arg) {
        let response = arg
        if (typeof arg == "string") {
            response = [arg]
        }
        return response
    }).argv

const config = {
    PlayerMovementChkBx: !!argv.PlayerMovementChkBx, // Player/Coach/Executive movement (trades, free agent signings, draft picks, etc.)
    ILChkBx: !!argv.ILChkBx, // Movement to/from injured/inactive list (IL)
    NBADLChkBx: !!argv.NBADLChkBx, // NBADL / G League movements
    InjuriesChkBx: !!argv.InjuriesChkBx, // Missed games due to injury
    PersonalChkBx: !!argv.PersonalChkBx, // Missed games due to personal reasons
    DisciplinaryChkBx: !!argv.DisciplinaryChkBx, // Disciplinary actions (suspensions, fines, etc.)
    LegalChkBx: !!argv.LegalChkBx, // Legal/Criminal incidents
}
const dates = {
    beginDate: argv.beginDate ?? '',
    endDate: argv.endDate ?? '',
}
console.log('---ARGUMENTS---')
console.table({
    player: argv.player,
    team: argv.team,
    config,
    dates
})

if (!Object.values(config).includes(true)) {
    throw new Error('No Transaction Type boxes were checked')
}

async function main() {
    const players = argv.player ?? []
    const teams = argv.team ?? []

    let initialURLs = urlHelper.getURLs(players, teams, config, dates)
    let idx = 0
    for (const { player, team, address } of initialURLs) {
        const data = await dataHelper.getAllData(address)

        dataHelper.saveData(idx, {
            player,
            team,
            config,
            dates,
            data
        })
        idx++;
    }
}

await main()



