// Returns a Promise that in turn returns an array of articles about the given search query
function getArticles(topic) {
    var url = 'https://newsapi.org/v2/everything?' +
        'q=' + topic + '&' +
        'from=2017-10-01&' +
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
        'https://apiv2.indico.io/political',
        JSON.stringify({
            'api_key': "5ca06cad390d60fb18f065997d116866",
            'data': article.description+article.title
        })
    ).then(function (res) {
        var r = JSON.parse(res);
        return [article, r.results];
    })
}

function classifyArticles(topic) {
    var left = [];
    var right = [];

    getArticles(topic).then((articles) => {

        for (var i = 0; i < articles.length; i++) {
            getPoliAnalysis(articles[i]).then((articleAndResults) => {

                var a = articleAndResults[0]
                var r = articleAndResults[1];

                var articleHtml; 

                if (r.Liberal > 0.5) {

                    a.leaning = r.Liberal;

                    articleHtml = "<a href=\'" + a.url + "\' class=\'article\'><p>" + a.title + "</p>" +
                    "<p>" + a.description + "</p>" +
                    "<p>" + a.leaning + "</p>";
                    
                    document.getElementById("left").insertAdjacentHTML('beforeend', articleHtml);
                }
                else if (r.Conservative > 0.4) {

                    a.leaning = r.Conservative;

                    articleHtml = "<a href=\'" + a.url + "\' class=\'article\'><p>" + a.title + "</p>" +
                    "<p>" + a.description + "</p>" +
                    "<p>" + a.leaning + "</p>";

                    document.getElementById("right").insertAdjacentHTML('beforeend', articleHtml);
                }
            }
        )
    }
    })

}

/*
// Adds articles to the left column related to the given search query
function addArticles() {

    var leftArticleList = "";
    var rightArticleList = "";

    // Build HTML to list articles in each array
    for (var i = 0; i < 3; i++) {
        leftArticleList = leftArticleList + "<a href=" + left[i].url + ", class=\'article\'><p>" + left[i].title + "</p>";
            //+ "<p>" + left[i].leaning + "</p></a>";
        rightArticleList = rightArticleList + "<a href=" + data[i].url + ", class=\'article\'><p>" + data[i].title + "</p>";
            //+ "<p>" + right[i].leaning + "</p></a>";
    }

    // Insert HTML in left div
    document.getElementById("left").insertAdjacentHTML('beforeend', leftArticleList);
    // Insert HTML in right div
    document.getElementById("right").insertAdjacentHTML('beforeend', rightArticleList);
}*/


function classifyArticles2(topic) {


    // If you want to do something with the array of articles, use the following call

    getArticles(topic).then((articles) => {
        var left = [];
        var right = [];

        for (var i = 0; i < articles.length; i++) {
            $.post(
                'https://apiv2.indico.io/political',
                JSON.stringify({
                    'api_key': "5ca06cad390d60fb18f065997d116866",
                    'data': articles[i].description
                })
            ).then(function (res) {
                var r = JSON.parse(res);
                var lib = r.results.Liberal;
                var cons = r.results.Conservative;

                console.log(r);
                console.log(cons);

                if (lib > 0.5) {
                    left.push(articles[i]);
                }

                if (cons > 0.5) {
                    right.push(articles[i]);
                }

                /*
                while (left.length < 3 && right.length < 3) {
                    if (left.length < 3 && lib > 0.5) {
                        //articles[i].leaning(res.liberal);
                        left.push(a);
                    }
                    else if (cons > 0.5) {
                        // articles[i].leaning(res.conservative);
                        right.push(a);
                    }
                } */
            });
        }
    })
}


/*
// Adds articles to the left column related to the given search query
function addArticles() {

    var leftArticleList = "";
    var rightArticleList = "";

    // Build HTML to list articles in each array
    for (var i = 0; i < 3; i++) {
        leftArticleList = leftArticleList + "<a href=" + left[i].url + ", class=\'article\'><p>" + left[i].title + "</p>";
            //+ "<p>" + left[i].leaning + "</p></a>";
        rightArticleList = rightArticleList + "<a href=" + data[i].url + ", class=\'article\'><p>" + data[i].title + "</p>";
            //+ "<p>" + right[i].leaning + "</p></a>";
    }

    // Insert HTML in left div
    document.getElementById("left").insertAdjacentHTML('beforeend', leftArticleList);
    // Insert HTML in right div
    document.getElementById("right").insertAdjacentHTML('beforeend', rightArticleList);
}*/
