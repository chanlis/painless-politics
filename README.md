# Middle Ground
This web app presents a non-biased perspective on political issues by featuring articles on either side of the debate, allowing the user to make an informed opinion on the subject. Our goal is to empower people who are subjected to the echo chambers of social media platforms to grow more conscious of other perspectives.

Built at SheHacks Boston 2018 by [@chanlis](https://github.com/chanlis), [@cho-e](https://github.com/cho-e), [@meganla](https://github.com/meganla), [@ctlwng](https://github.com/ctlwng), and [@wongjwm](https://github.com/wongjwm).

## How we built it
- Parsed and retrieved news articles from the [News API](https://newsapi.org/).
- Filtered articles based on a political sentiment analysis from the [Indico API](https://indico.io/product).
- Separated articles according to political leaning (currently tuned to liberal and conservative perspectives).
- Developed website using HTML/CSS, JavaScript, and Jekyll templating.

## Demo
You can find the app runnning at [https://middle-ground.herokuapp.com](https://middle-ground.herokuapp.com)!

## Running this locally
- Install Ruby version 2.2.5 or above. Check the current version downloaded with `ruby -v`. Follow the download instructions here: [Installing Ruby](https://www.ruby-lang.org/en/documentation/installation/).
- Install RubyGems. Follow the instructions here: [RubyGems](https://rubygems.org/pages/download).
- Clone this repo using `git clone https://github.com/chanlis/painless-politics.git` and `cd painless-politics`.
- Run `jekyll serve`
- Visit the web app from the server address generated in a browser.

## Next steps
- Extracting full article text from a URL for sentiment analysis.
- Implementing a fact checking API to allow users to instantly asess the credibility of the sources.
- Adding a search function for any user-specified topics.
- Providing a platform to facilitate communication between legislators and citizens.
- Including articles that lean more towards other political parties.
- Making website responsive.
