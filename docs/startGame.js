      // Defining all of the game files
      let game = ["controller.js", "display.js", "engine.js", "game.js", "main.js"]
      
      // Iterating through all of the game files
      for (let index = 0; index < game.length; index ++) {

        let script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", game[index]);
        document.head.appendChild(script);

      }