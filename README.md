# Urban Outfitters Coding Challenge

This repository contains the Urban Outfitters Coding Challenge.

The application prompts the user to enter a [subreddit](https://www.reddit.com/reddits/), a posting time, and a phone number. Once the information has been received, the application sends a SMS text message to the phone number entered containing a link to the top rated posting based on the time that was chosen. For instance, if the user were to choose the subreddit `gifs` and select `all` from the dropdown menu, a text messaging containing the highest rated `gifs` posting of all time would be sent to the phone number that the user entered.

In addition to the client-side application, I also wrote a server-side application in Python using the [Flask](http://flask.pocoo.org/) microframework. This serves as a proxy for issuing HTTP requests to the Twilio REST API to prevent exposure of my Twilio `ACCOUNT SID` and `AUTH TOKEN`. The proxy is deployed using [Heroku](https://www.heroku.com/).

# Objective

Create a simple app that interfaces with a public open API ([http://www.programmableweb.com/apis/directory](http://www.programmableweb.com/apis/directory)). The app should utilize an interaction pattern, such as user input/button, geolocation, etc., to pass information to the API, and with returned data, create content on the page.

Structure your app as you see fit. Connect to the API via `xmlhttprequest`, `$.ajax`, angular `$resource`, or whatever you are most comfortable with. Use any framework, and any structure to your app, but be prepared to justify your selection.

Bonus points:

- [x] API error handling
- [ ] Compressed js
- [ ] CSS supersets (sass/less)
- [x] Use a grid for layout
- [x] JavaScript tests
- [x] Native js
- [x] Task runner (grunt/gulp)
- [ ] Automation a big plus!

# Quickstart

    $ npm install
    $ gulp serve

# Testing

    $ gulp test

# Coding Style

I decided to use the [Angular style guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) written by [John Papa](https://johnpapa.net/). I found that with previous projects using Angular, applications have the tendency to become convoluted, making it difficult to scale and contribute to. The coding style chosen for this application attempts to adhere to the **LIFT** principle:

1. `L`ocating our code is easy
2. `I`dentify code at a glance
3. `F`lat structure as long as we can
4. `T`ry to stay DRY (Don't Repeat Yourself) or T-DRY

# Challenges

I had some difficulty with unit testing using `PhantomJS`, `Jasmine`, and `Karma`. I developed this application using a [Vagrant](https://www.vagrantup.com/) box which caused some minor issues.

I also wanted to bootstrap this application from scratch. Therefore, I did not use any scaffolding tools (e.g. [Yeoman](http://yeoman.io/)) for development. Structuring the application proved to be a bit of a challenge, but definitely gave me more control over my application and allowed me to *really* understand what goes on behind the scenes.

# Thoughts

Overall, this was a fun and challenging project. Hope you enjoy!
