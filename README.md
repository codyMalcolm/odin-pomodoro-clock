# Pomodoro Clock

## Objective

To build a Pomodoro Clock using HTML, CSS, and Javascript.

#### Specifications

##### Main

Build a Pomodoro Clock, such as [this example.](http://romantic-trouble.surge.sh/)
This is intended as a pair programming project.

##### Recommended

Do this with a friend!

#### Learning Objectives

Hone HTML, CSS, and Javascript skills.

## Author's Notes

#### Preliminary Thoughts

If I had to wager, I'd say this is strictly easier than the [Javascript Calculator](https://github.com/codyMalcolm/odin-javascript-calculator). I've used setTimeout before, so this time I'll use setInterval.

#### Final Thoughts

I could probably refactor the code a bit to better adhere to DRY standards, and there's surely a more elegant way to parse the time strings with regex. For that matter, I'm a bit uncomfortable with how the script sometimes pulls the relevant time value straight from the HTML text. If I was to rebuild it, I would definitely design it in a more React-like way, where all the authoritative data is held at all times in variables within the program (eg. state) and is distributed one-way to the HTML. But this was a quick, easy, and dirty solution and there's no security concerns to warrant that kind of refactor.

## Miscellaneous

Read more about this project at [The Odin Project.](https://www.theodinproject.com/courses/web-development-101/lessons/pairing-project)
