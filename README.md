# Weather Dashboard Challenge - The Outside is Scary!?

## Description

Server-side APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. APIs are very powerful tools because of all the data and functions that they provide to developers. Most of these APIs are not free and for those that are, there are even some strict limitations because data isn't cheap. Many tech giants offer this as a service to consumers in a way to make money because nowadays, whoever has the most data has the most power.

Today we will be building a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.  This weather dashboard app will use the API from OpenWeather, which takes in an user-inputted city and retieves weather data over a 5 day period.

## Installation

No installation is required!  This code has been deployed to GitHub Pages so that you can view it on your own device.  To do so, please visit the following link: https://kitkatbar.github.io/weather-dashboard-challenge/

## Usage

Please refer to these images showing the layout of the application.  Please note that what you see in the sample images may slightly differ from your own viewing perspective.

For larger devices:

![Layout display for larger devices](https://github.com/KitKatBar/weather-dashboard-challenge/blob/main/assets/images/dashboard-layout-large.png?raw=true)

For smaller devices:

![Layout display for larger devices](https://github.com/KitKatBar/weather-dashboard-challenge/blob/main/assets/images/dashboard-layout-small.png?raw=true)

When you first load the webpage, you will be presented with a header that reads 'Weather Dashboard' and there will be an input box on the left side with a 'Search' button.

![Initial display of the dashboard on page load](https://github.com/KitKatBar/weather-dashboard-challenge/blob/main/assets/images/initial-display.png?raw=true)

Entering a city and clicking the 'Search' button will display the current weather forecast in a large card and the future weather forecast over the next 5 days in their respective smaller sized cards.  Additionally, your search history will be logged and a button will display along with the name of the city you just searched.  There will also be a 'Clear Search History' button displayed.

![Display when a city is searched for](https://github.com/KitKatBar/weather-dashboard-challenge/blob/main/assets/images/search-display.png?raw=true)

Searching for other cities will continue to append a button to the search history, in which you can click to re-display the weather for cities that you have previously searched.  If you search for a city that has been already previously searched for, it will not create another button for the same city, hereby avoiding duplicates.  Additionally, a bonus feature I have included is that the search history is ordered by most recent searches from top to bottom.  So if you search for a city that you have previously searched for, it will move back to the top of the list.  Clicking 'Clear Search History' will reset your entire search history so be careful!  It will not remove the weather display for your last searched city, but all the previous searches will be gone.

![Display when the search history is cleared](https://github.com/KitKatBar/weather-dashboard-challenge/blob/main/assets/images/clear-history-display.png?raw=true)

## Credits

This application was built using and incorporating various types of technologies.

Bootstrap: https://getbootstrap.com/
Bootstrap Docs: https://getbootstrap.com/docs/5.2/getting-started/introduction/

jQuery & jQuery UI: https://releases.jquery.com/

Day.js Library: https://day.js.org/

OpenWeather API: https://openweathermap.org/

Our instructor Drew Hoang for once again giving us advice and his thought process on how to start creating a website from scratch.  It amazes me how he can look at a sample image or mock-up of a website and just be able to perfectly replicate it.  The fact that he is able to continuously do this again and again with the practice problems in class without affecting our ability to learn is amazing.  His speed-run videos are also very insightful for providing information and for reviewing class material.

Our TA Kyle Vance for his continued guidance during class and taking the time to explain how he would tackle practice problems.  He continues to provide direction for students and explains why he approaches these problems a certain way.  It gives us the confidence to try these tips on our own and we should have no fear even if we don't succeed because he's there to help us if we're ever stuck.

## License

This project was built using the MIT License.  Please refer to the LICENSE in the repo for more information.