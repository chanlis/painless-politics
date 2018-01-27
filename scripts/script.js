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

var left = [];
var right = [];

function classifyArticles(topic) {
    // If you want to do something with the array of articles, use the following call
    getArticles(topic).then((data) => {

    for (var i = 0; i < desArr.length; i++) {
        $.post(
        'https://apiv2.indico.io/political',
         JSON.stringify({
            'api_key': "5ca06cad390d60fb18f065997d116866",
            'data': desArr[i],
            'threshold': 0.25
        })
        ).then(function(res) { 
            while(left.length < 3 && right.length < 3) {
                if(left.length < 3 && res.liberal > res.conservative) {
                    data[i].leaning(res.liberal);
                    left.push(data[i]);
                }
                else {
                    data[i].leaning(res.conservative);
                    right.push(data[i]);
                }
            } });
}
})
}

// Adds articles to the left column related to the given search query
function addArticles(topic) {

    
        // The parameter 'data' is the array of articles
        var leftArticleList = "";
        var rightArticleList = "";

        // Build HTML to list 3 most recent articles
        for (var i = 0; i < 3; i++) {
            leftArticleList = leftArticleList + "<a href=" + left[i].url + ", class=\'article\'><p>" + left[i].title + "</p>"
            + "<p>" + left[i].leaning + "</p></a>";
            rightArticleList = rightArticleList + "<a href=" + data[i].url + ", class=\'article\'><p>" + data[i].title + "</p>"
            + "<p>" + right[i].leaning + "</p></a>";;
        }

        // Insert HTML in left div
        document.getElementById("left").insertAdjacentHTML('beforeend', leftArticleList);
        // Insert HTML in right div
        document.getElementById("right").insertAdjacentHTML('beforeend', rightArticleList);
}


