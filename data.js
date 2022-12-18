import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import { load } from 'cheerio'

const getAllData = async (initialAddress) => {

    checkStorageFolder();
    let $ = await getData(initialAddress);
    if (!checkIfValidPage($)) {
        console.log(`Not a valid address : ${initialAddress}`)
        return [];
    }
    let data = extractData($)
    const followupPages = getFollowupPages($, initialAddress)
    console.log(`---FOLLOWUP URLS---`)
    console.log(followupPages)
    for (const address of followupPages) {
        $ = await getData(address);
        data = data.concat(extractData($))
    }
    return data
}

const saveData = async (key, data) => {
    // convert JSON object to a string

    const stringifiedData = JSON.stringify(data, null, 4)

    // write JSON string to a file
    fs.writeFile(`storage/${key}.json`, stringifiedData, err => {
        if (err) {
            throw err
        }
        console.log('JSON data is saved.')
    })
}
const checkStorageFolder = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dir = path.resolve(path.join(__dirname, 'storage'));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    } else {
        fs.readdir(dir, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(dir, file), (err) => {
                    if (err) throw err;
                });
            }
        });
    }
}

const getData = async (address) => {
    console.log(`---HANDLING URL: ${address}`)
    const response = await fetch(address);
    const body = await response.text();
    return load(body);
}
const extractData = ($) => {
    const data = []
    $("table.datatable > tbody > tr:not(.DraftTableLabel)").each(function () {
        var tmpArray = $(this).find('td')
        let date = $(tmpArray[0]).text()
        let teamName = $(tmpArray[1]).text().trim()
        let acquired = $(tmpArray[2]).text().trim().split('• ').filter(Boolean)
        let relinquished = $(tmpArray[3]).text().trim().split('• ').filter(Boolean)
        let notes = $(tmpArray[4]).text().trim()
        data.push({
            date,
            teamName,
            acquired: acquired.join(','),
            relinquished: relinquished.join(','),
            notes
        })
    })
    return data;
}

const getFollowupPages = ($, address) => {
    const countOfFollowupPages = extractPageCount($)
    const urls = []
    const urlObj = new URL(address)
    for (var i = 0; i < countOfFollowupPages; i++) {
        const newStartIndex = (i + 1) * 25
        urlObj.searchParams.set("start", newStartIndex)
        urls.push(urlObj.toString())
    }
    return urls
}

const extractPageCount = ($) => {
    const paginationSection = $("table:not(.datatable) > tbody > tr:not(.DraftTableLabel) > td")[2]
    return $(paginationSection).find('a').length
}

const checkIfValidPage = ($) => {
    return $("table.datatable").length
}

export default {
    getAllData,
    saveData
}