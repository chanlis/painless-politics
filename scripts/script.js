// Returns a Promise that in turn returns an array of articles about the given search query
function getArticles(topic) {
    var url = 'https://newsapi.org/v2/everything?' +
        'q=' + topic + '&' +
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


function getPoliAnalysis(article) {
   return  $.post(
        'https://cors-anywhere.herokuapp.com/https://apiv2.indico.io/political',
        JSON.stringify({
            'api_key': "5ca06cad390d60fb18f065997d116866",
            'data': article.description+article.title
        })
    ).then(res => [article, res.results]);
}

function classifyArticles(topic) {
    var left = [];
    var right = [];

    getArticles(topic).then((articles) => {
        var leftcounter = 0;
        var rightcounter = 0;
        for (var i = 0; i < articles.length; i++) {
            getPoliAnalysis(articles[i]).then((articleAndResults) => {

                var a = articleAndResults[0]
                var r = articleAndResults[1];

                var articleHtml; 

                if (r.Liberal > 0.3 && r.Liberal > r.Conservative && leftcounter < 3) {

                    a.leaning = r.Liberal;

                    pct = Math.floor(a.leaning * 100) + '%';

                    articleHtml = "<a href=\'" + a.url + "\' target=\'_blank\' class=\'article-title\'><p>" + a.title + "</p></a>" +
                    "<p class=\'article-desc\'>" + a.description + "</p><div class=\'progress\'>" +
                    "<div id=\'blue-bar\' class=\'progress-bar\' style=\'width:" + pct + "\'>" + pct + "</div></div>";

                    document.getElementById("left").insertAdjacentHTML('beforeend', articleHtml);
                    leftcounter++;
                }
                else if (r.Conservative > 0.2 && rightcounter < 3) {

                    a.leaning = r.Conservative;

                    pct = Math.floor(a.leaning * 100) + '%';

                    articleHtml = "<a href=\'" + a.url + "\' target=\'_blank\' class=\'article-title\'><p>" + a.title + "</p></a>" +
                    "<p class=\'article-desc\'>" + a.description + "</p><div class=\'progress\'>" +
                    "<div id=\'red-bar\' class=\'progress-bar\' style=\'width:" + pct + "\'>" + pct + "</div></div>";


                    document.getElementById("right").insertAdjacentHTML('beforeend', articleHtml);
                    rightcounter++;
                }
            
            }
        )
    }
    })

}
