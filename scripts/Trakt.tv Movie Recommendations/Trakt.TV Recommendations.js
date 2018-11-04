// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: film;

// Trakt: 
let traktToken = "" // Trakt Auth Token
let traktApiKey = "" // Trakt ClientID. See https://trakt.tv/oauth/applications

let traktApiUrl = "https://api.trakt.tv/recommendations/movies"

// The Movie DB, for posters
let tmdbApiKey = "" // TMDB API Key. See https://www.themoviedb.org/settings/api

let movieReq = new Request(traktApiUrl)
movieReq.method = "GET"
movieReq.contentType = "application/json"
movieReq.headers = {"content-type": "application/json", "Authorization" : "Bearer " + traktToken, "trakt-api-version" : "2", "trakt-api-key" : traktApiKey}

let movieJson = await movieReq.loadJSON()
movieJson = shuffle(movieJson)

let movieTable = new UITable()
for (var i = 0; i < movieJson.length; i++) {
    let tmdbId = movieJson[i].ids.tmdb
    // Get Poster
    let posterReq = new Request(`https://api.themoviedb.org/3/movie/${tmdbId}/images?api_key=${tmdbApiKey}`)
    posterReq.method = "GET"
    let posterJson = await posterReq.loadJSON()
    let posterUrl = "http://image.tmdb.org/t/p/w185" + posterJson.posters[0].file_path

    // Setup Table Row
    let row = new UITableRow()
    let posterCell = row.addImageAtURL(posterUrl)
    let titleCell = row.addText(movieJson[i].title, movieJson[i].year.toString())
    posterCell.widthWeight = 20
	titleCell.widthWeight = 80
	row.height = 120
    row.cellSpacing = 10
    
	movieTable.addRow(row)
}

// Present:
if (config.runsWithSiri) {
	Speech.speak(`Here are my recommendations.`)
}
QuickLook.present(movieTable)

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}