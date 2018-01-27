
// Example: planned parenthood
getArticle('planned-parenthood')

// A function I wrote to display an array of articles with the given topic/keywords
function getArticle(topic) {
    var url = 'https://newsapi.org/v2/everything?' +
        'q=' + topic + '&' +
        'from=2018-01-01&' +
        'sortBy=popularity&' +
        'apiKey=4fa5e1cdae464d49aece432257159068';

    var req = new Request(url);

    fetch(url).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })
        ).then(res => {
            // print array of articles to console
            console.log(res.status, res.data.articles)
        }))
}




