# Battleship

This is an application of the classic board game, Battleship! Coded in JavaScript, this was the first project I did to familiarize myself with the syntax of the language, while also gaining a few more skills in HTML and CSS. The inspiration for this project was also to bring an application to life that was reflective of my childhood.

## How To Run

Run the HTML file locally, through Live Server or through your browser by double-clicking the file.

## How To Play

Currently, this version of the application only supports local multiplayer (one-on-one). For those unfamiliar with Battleship, Player 1 starts by placing their ships on the board, then the board switches and Player 2 will place their ships. The ships are as follows:

Ship 1: 2 squares
Ship 2: 3 squares
Ship 3: 4 squares

Squares of the ship must be placed adjacently to one another, or else the placement will not work. Successful placements, as of this version, are green-bordered squares.

Thereafter, players take turns "firing" (clicking) at a spot on the opponent's board, the goal being to sink all of the opponent's ships. Whether you hit (red X mark), miss (blue square), or sink one of their ships, that will be reflected on the UI. Once a player sinks all of the opponent's ships, they are declared the winner and the game state resets.

## Improvements

I hope to continue improving this app by adding a few more features and customization into the game, such as having different ships to choose from with more/less lives, and larger/smaller game boards. Furthermore, I will look to implement an AI for Player 2 so for a single-player mode.
