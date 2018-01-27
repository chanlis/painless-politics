// url array to be stored as a variable
var desArr;

// Returns a Promise that in turn returns an array of articles about the given search query
function getArticles(topic) {
    var url = 'https://newsapi.org/v2/everything?' +
        'q=' + topic + '&' +
        'from=2018-01-01&' +
        'sortBy=popularity&' +
        'apiKey=4fa5e1cdae464d49aece432257159068';

    var req = new Request(url);

    return fetch(url).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })
        ).then(res => {
            // print array of articles to console
            return res.data.articles;

        }))
}

/*
// adds first 6 urls to an array of urls
function buildDescriptionArray(topic) {
    getArticles(topic).then(data) => {
        for(var i = 0; i < 6; i++) {
            desArr.push(data[i].description);
        }
    }
}

function rateDescriptions {
    for (var i = 0; i < desArr.length; i++) {
        $.post(
        'https://apiv2.indico.io/political',
         JSON.stringify({
            'api_key': "5ca06cad390d60fb18f065997d116866",
            'data': desArr[i],
            'threshold': 0.25
        })
        ).then(function(res) { console.log(res) });
}
}*/

// Adds articles to the left column related to the given search query
function addLeftArticles(topic) {

    // If you want to do something with the array of articles, use the following call
    getArticles(topic).then((data) => {

        // The parameter 'data' is the array of articles
        var leftArticleList = "";

        // Build HTML to list 3 most recent articles
        for (var i = 0; i < 3; i++) {
            leftArticleList = leftArticleList + "<a href=\"" + data[i].url + "\" class=\'article\'><p>" + data[i].title + "</p></a>";
        }

        // Insert HTML in left div
        document.getElementById("left").insertAdjacentHTML('beforeend', leftArticleList);
    })
}

// Adds articles to the right column related to the given search query
function addRightArticles(topic) {

    getArticles(topic).then((data) => {
        var rightArticleList = "";
        for (var i = 0; i < 3; i++) {
            rightArticleList = rightArticleList + "<a href=\"" + data[i].url + "\" class=\'article\'><p>" + data[i].title + "</p></a>";
        }

        // Insert HTML in right div
        document.getElementById("right").insertAdjacentHTML('beforeend', rightArticleList);
    })
}
