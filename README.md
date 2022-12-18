<br />
<div align="center">

<h3 align="center">prosportstransactions.com parser</h3>
</div>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

You have to install Nodejs and the Node Package Manager (npm) on your operating system. Here is an useful [guide](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment#installing_node). You can find more online.


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/onurburak9/prosportstransactions-crawler.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Inputs
User can give Player names, Team Nicknames, Transaction types, Begin and End Dates to set a time range to the parser.

#### Player Names (optional)
User can provide one or more player names
```sh
--player="Stephen Curry" --player="Lebron James"
```

#### Team Nicknames  (optional)
User can provide one or more team nicknames (Knicks, Bucks, etc.)
```sh
--team="Celtics"
```

#### Transaction types
At least one the transaction type should be `true` or code would not work!

```json
{
    "PlayerMovementChkBx": "Player/Coach/Executive movement (trades, free agent signings, draft picks, etc.)",
    "ILChkBx": "Movement to/from injured/inactive list (IL)",
    "NBADLChkBx": "NBADL / G League movements",
    "InjuriesChkBx": "Missed games due to injury",
    "PersonalChkBx": "Missed games due to personal reasons",
    "DisciplinaryChkBx": "Disciplinary actions (suspensions, fines, etc.)",
    "LegalChkBx": "Legal/Criminal incidents"
}
```

```sh
 --PlayerMovementChkBx=true --DisciplinaryChkBx=true
```

#### Begin/End Dates(optional)
User can provide begin and/or end dates in this format: YYYY-MM-DD
```sh
--beginDate="2013-02-30" --endDate="2022-03-30"
```

#### Example
```sh
 npm start -- --player="Carmelo Anthony" --player="J.R. Smith" --team="knicks" --team="nuggets" --beginDate="2010-01-30" --endDate="2022-08-30" --PlayerMovementChkBx=true --ILChkBx=true
```
This call would create these request objects and parse the website accordingly. The results would be saved under `/storage` folder.
```json
[
  {
    "player": "Carmelo+Anthony",
    "team": "knicks",
    "config": {
      "PlayerMovementChkBx": true,
      "ILChkBx": true,
      "NBADLChkBx": false,
      "InjuriesChkBx": false,
      "PersonalChkBx": false,
      "DisciplinaryChkBx": false,
      "LegalChkBx": false
    },
    "dates": { "beginDate": "2010-01-30", "endDate": "2022-08-30" },
    "address": "https://www.prosportstransactions.com/basketball/Search/SearchResults.php?Player=Carmelo+Anthony&Team=knicks&BeginDate=2010-01-30&EndDate=2022-08-30&PlayerMovementChkBx=yes&ILChkBx=yes&start=0"
  },
  {
    "player": "Carmelo+Anthony",
    "team": "nuggets",
    "config": {
      "PlayerMovementChkBx": true,
      "ILChkBx": true,
      "NBADLChkBx": false,
      "InjuriesChkBx": false,
      "PersonalChkBx": false,
      "DisciplinaryChkBx": false,
      "LegalChkBx": false
    },
    "dates": { "beginDate": "2010-01-30", "endDate": "2022-08-30" },
    "address": "https://www.prosportstransactions.com/basketball/Search/SearchResults.php?Player=Carmelo+Anthony&Team=nuggets&BeginDate=2010-01-30&EndDate=2022-08-30&PlayerMovementChkBx=yes&ILChkBx=yes&start=0"
  },
  {
    "player": "J.R.+Smith",
    "team": "knicks",
    "config": {
      "PlayerMovementChkBx": true,
      "ILChkBx": true,
      "NBADLChkBx": false,
      "InjuriesChkBx": false,
      "PersonalChkBx": false,
      "DisciplinaryChkBx": false,
      "LegalChkBx": false
    },
    "dates": { "beginDate": "2010-01-30", "endDate": "2022-08-30" },
    "address": "https://www.prosportstransactions.com/basketball/Search/SearchResults.php?Player=J.R.+Smith&Team=knicks&BeginDate=2010-01-30&EndDate=2022-08-30&PlayerMovementChkBx=yes&ILChkBx=yes&start=0"
  },
  {
    "player": "J.R.+Smith",
    "team": "nuggets",
    "config": {
      "PlayerMovementChkBx": true,
      "ILChkBx": true,
      "NBADLChkBx": false,
      "InjuriesChkBx": false,
      "PersonalChkBx": false,
      "DisciplinaryChkBx": false,
      "LegalChkBx": false
    },
    "dates": { "beginDate": "2010-01-30", "endDate": "2022-08-30" },
    "address": "https://www.prosportstransactions.com/basketball/Search/SearchResults.php?Player=J.R.+Smith&Team=nuggets&BeginDate=2010-01-30&EndDate=2022-08-30&PlayerMovementChkBx=yes&ILChkBx=yes&start=0"
  }
]
```

### Output

```json
{
    "player": "Stephen+Curry",
    "team": "",
    "config": {
        "PlayerMovementChkBx": true,
        "ILChkBx": true,
        "NBADLChkBx": false,
        "InjuriesChkBx": false,
        "PersonalChkBx": false,
        "DisciplinaryChkBx": false,
        "LegalChkBx": false
    },
    "dates": {
        "beginDate": "2010-01-30",
        "endDate": "2022-08-30"
    },
    "data": [
        {
            "date": "2010-09-29",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "team exercised contract option through 2011-12"
        },
        {
            "date": "2010-10-31",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained right ankle"
        },
        {
            "date": "2010-11-05",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2010-12-11",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained left ankle"
        },
        {
            "date": "2010-12-25",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2011-06-29",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "team exercised contract option for 2012-13"
        },
        {
            "date": "2011-12-28",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained right ankle"
        },
        {
            "date": "2011-12-31",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2012-01-06",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained right ankle"
        },
        {
            "date": "2012-01-20",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2012-03-19",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL (F)"
        },
        {
            "date": "2012-03-27",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained right ankle (out for season)"
        },
        {
            "date": "2012-10-31",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "re-signed to a 4-year $44M contract extension"
        },
        {
            "date": "2013-01-31",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained right ankle"
        },
        {
            "date": "2013-02-02",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2013-11-20",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with concussion"
        },
        {
            "date": "2013-11-23",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2016-04-18",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained right ankle"
        },
        {
            "date": "2016-04-24",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2016-04-27",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained MCL in right knee"
        },
        {
            "date": "2016-05-09",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2017-01-29",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with stomach flu"
        },
        {
            "date": "2017-02-01",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2017-07-01",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "player became an unrestricted free agent"
        },
        {
            "date": "2017-07-06",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "re-signed unrestricted free agent to a 5-year $201.2M contract"
        },
        {
            "date": "2017-11-13",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with bruised right thigh"
        },
        {
            "date": "2017-11-16",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2017-11-27",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with bruised right hand"
        },
        {
            "date": "2017-11-29",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2017-12-06",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained right ankle"
        },
        {
            "date": "2017-12-30",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2018-01-13",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2018-03-09",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained right ankle"
        },
        {
            "date": "2018-03-23",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2018-03-25",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained MCL in left knee"
        },
        {
            "date": "2018-05-01",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2018-11-10",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with strained left groin"
        },
        {
            "date": "2018-12-01",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2019-03-23",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL"
        },
        {
            "date": "2019-03-24",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2019-04-10",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained right ankle"
        },
        {
            "date": "2019-04-12",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2019-11-01",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with fractured left hand"
        },
        {
            "date": "2020-03-04",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2020-03-07",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with flu"
        },
        {
            "date": "2020-03-11",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2021-03-23",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with bruised tailbone"
        },
        {
            "date": "2021-03-29",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2021-08-06",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "re-signed to a 4-year $215M contract extension"
        },
        {
            "date": "2021-11-19",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with bruised left hip"
        },
        {
            "date": "2021-11-20",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2021-12-18",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL"
        },
        {
            "date": "2021-12-20",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2022-01-06",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with bruised left quadricep"
        },
        {
            "date": "2022-01-08",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2022-01-15",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with right hand injury"
        },
        {
            "date": "2022-01-18",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2022-02-01",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with toe injury"
        },
        {
            "date": "2022-02-02",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2022-03-07",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sore left hand"
        },
        {
            "date": "2022-03-08",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        },
        {
            "date": "2022-03-17",
            "teamName": "Warriors",
            "acquired": "",
            "relinquished": "Stephen Curry",
            "notes": "placed on IL with sprained left foot"
        },
        {
            "date": "2022-04-16",
            "teamName": "Warriors",
            "acquired": "Stephen Curry",
            "relinquished": "",
            "notes": "activated from IL"
        }
    ]
}
```



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don"t forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m "Add some AmazingFeature"`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>