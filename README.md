![Header](src/assets/UdaipurCover.png)

# Udaipur

A minimalistic clone of the popular 2-player card trading board game [Jaipur](https://boardgamegeek.com/boardgame/54043/jaipur) with **Online Multiplayer** support built using [boardgame.io](github.com/nicoldavis/boardgame.io) and React JS.

## About the Game

Jaipur is a 2 player, trading card game where you and your opponent are traders and are trying to make the most money, buying and selling resources from the market. Resources initially sell for a larger amount and start to yield lesser money as more of them get sold in the market.

Camels act as Wildcards, by allowing them to be traded for any other resource, however camels cannot be sold, only traded. This requires the player to strike a balance between taking and selling camels.

Find a quick game guide here:  
[![Jaipur - Rules](https://img.youtube.com/vi/SD3g4gOf_N8/0.jpg)](https://www.youtube.com/watch?v=SD3g4gOf_N8).

You can also find help within the Udaipur Website under [Game Help]()
The only departure from the original rules in Udaipur is the removal of **Seal of Excellence** to simplify and shorten the game.

## Development

- Run `npm install` to install the necessary packages
- Run `npm run client` to run the front-end client
- Run `npm run server` to run the game server

## Deployment

- Set `APP_PRODUCTION=true` in **src/config.js**
- Run `npm run start` to deploy the app

You can deploy it yourself on Heroku using the button below .  
 [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/skvrahul/udaipur-game/tree/deploy_heroku)

## Screenshots

### Home Page

![Home Page](demo/udaipur_homePage.gif)

### Lobby

![Lobby](demo/udaipur_lobby.png)

### Game Board

![Game Board](demo/udaipur_board.png)
