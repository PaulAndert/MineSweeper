# MineSweeper

This project is part of the student project for the module Typescript of the TH Brandenburg in the summer semester 2022.  
It's a command line implementation of the game Minesweeper written in typescript.

### Anforderungen

* @types/jest@27.5.1
* @types/node@17.0.32
* jest@28.1.0
* jetty@0.2.1
* random@3.0.6
* ts-jest@28.0.2
* typescript@4.6.4

download the project:
```console
https://github.com/PaulAndert/MineSweeper.git
```

download the dependencies
```console
npm -i 
```

### How do i play the game

navigate into the project and enter
```terminal
npx tsc && node dist/main.js
```

this starts the game and then you have the following options 
Menu:  
s - start game  
o - options  
q - quit the game    
  
Options:  
1 - height  
2 - width  
3 - bomb chance  
this is how to change the values 
\<option that should change (1,2,3)\> \<new value\>  
example:  
1 20 sets height to 20  
2 2 sets width to 2  

Game: (upper or lower case is doing the same here)
a1 -> tap the field a1 
f b1 -> set flag on b1  
help -> print the controls  
  
  
### Recommendations
terminal window with atleast this dimensions  
Login window:
width : >=75  
height : >=13  
Game_window:
width : (chosen_width + 1) * 4 + 1  
height : (chosen_height + 1) * 2 + 6  
