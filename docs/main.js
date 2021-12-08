// Origin: Frank Poth
// Update: Jacob Amin


window.addEventListener("load", function(event) {

  "use strict";

  //// CONSTANTS ////

  const ZONE_PREFIX = "zone";
  const ZONE_SUFFIX = ".json";

      /////////////////
    //// CLASSES ////
  /////////////////

  const AssetsManager = function() {

    this.tile_set_image = undefined;

  };

  AssetsManager.prototype = {

    constructor: Game.AssetsManager,

    requestJSON:function(url, callback) {

      let request = new XMLHttpRequest();

      request.addEventListener("load", function(event) {

        callback(JSON.parse(this.responseText));

      }, { once:true });

      request.open("GET", url);
      request.send();

    },

    requestImage:function(url, callback) {

      let image = new Image();

      image.addEventListener("load", function(event) {

        callback(image);

      }, { once:true });

      image.src = url;

    },

  };

      ///////////////////
    //// FUNCTIONS ////
  ///////////////////

  var keyDownUp = function(event) {

    controller.keyDownUp(event.type, event.keyCode);

  };

  var resize = function(event) {

    display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
    display.render();

    var rectangle = display.context.canvas.getBoundingClientRect();

    p.style.left = rectangle.left + "px";
    p.style.top  = rectangle.top + "px";
    p.style.fontSize = game.world.tile_set.tile_size * rectangle.height / (game.world.height * 2) + "px";

  };

  var render = function() {

    var frame = undefined;

    display.drawMap   (assets_manager.tile_set_image,
    game.world.tile_set.columns, game.world.graphical_map, game.world.columns,  game.world.tile_set.tile_size);



    // Rendering the Lights Object!

    let lights = game.world.lights;

    frame = game.world.tile_set.frames[lights.frame_value];

    display.drawObject(assets_manager.tile_set_image,
    frame.x, frame.y,
    lights.x + Math.floor(lights.width * 0.5 - frame.width * 0.5) + frame.offset_x,
    lights.y + frame.offset_y, frame.width, frame.height);

    // Health Bar
    if (game.world.lights.countDangerMax != 10000) {
      let left = game.world.lights.countDangerMax - game.world.lights.countLights;
      let danger = game.world.lights.countDangerMax;

      if (left > 0.75 * danger) {
        frame = game.world.tile_set.frames[10];

      } else if (left > 0.5 * danger) {
        frame = game.world.tile_set.frames[11];

      } else if (left > 0.25 * danger) {
        frame = game.world.tile_set.frames[12];

      } else if (left > 0.02 * danger) {
        frame = game.world.tile_set.frames[13];

      } else {
        frame = game.world.tile_set.frames[14];
      }
      display.drawObject(assets_manager.tile_set_image,
        frame.x, frame.y,
        lights.x + Math.floor(lights.width * 0.5 - frame.width * 0.5) + frame.offset_x,
        lights.y - 1 + frame.offset_y, frame.width, frame.height);
    }



    // Rendering the Leak Object!
    let leak = game.world.leak;

    frame = game.world.tile_set.frames[leak.frame_value];

    display.drawObject(assets_manager.tile_set_image,
    frame.x, frame.y,
    leak.x + 5 + Math.floor(leak.width * 0.5 - frame.width * 0.5) + frame.offset_x,
    leak.y + frame.offset_y, frame.width, frame.height);

    // Health Bar
    if (game.world.leak.countDangerMax != 10000) {
      let left = game.world.leak.countDangerMax - game.world.leak.countLeak;
      let danger = game.world.leak.countDangerMax;

      if (left > 0.75 * danger) {
        frame = game.world.tile_set.frames[10];

      } else if (left > 0.5 * danger) {
        frame = game.world.tile_set.frames[11];

      } else if (left > 0.25 * danger) {
        frame = game.world.tile_set.frames[12];

      } else if (left > 0.02 * danger) {
        frame = game.world.tile_set.frames[13];

      } else {
        frame = game.world.tile_set.frames[14];
      }
      display.drawObject(assets_manager.tile_set_image,
        frame.x, frame.y,
        leak.x + 5 + Math.floor(leak.width * 0.5 - frame.width * 0.5) + frame.offset_x,
        leak.y - 1 + frame.offset_y, frame.width, frame.height);
    }


    
    // Rendering the Steer Object!
    let steer = game.world.steer;

    frame = game.world.tile_set.frames[steer.frame_value];

    display.drawObject(assets_manager.tile_set_image,
    frame.x, frame.y,
    steer.x + 5 + Math.floor(steer.width * 0.5 - frame.width * 0.5) + frame.offset_x,
    steer.y + frame.offset_y, frame.width, frame.height);

    // Health Bar
    if (game.world.steer.countDangerMax != 10000) {
      let left = game.world.steer.countDangerMax - game.world.steer.countSteer;
      let danger = game.world.steer.countDangerMax;

      if (left > 0.75 * danger) {
        frame = game.world.tile_set.frames[10];

      } else if (left > 0.5 * danger) {
        frame = game.world.tile_set.frames[11];

      } else if (left > 0.25 * danger) {
        frame = game.world.tile_set.frames[12];

      } else if (left > 0.02 * danger) {
        frame = game.world.tile_set.frames[13];

      } else {
        frame = game.world.tile_set.frames[14];
      }
      display.drawObject(assets_manager.tile_set_image,
        frame.x, frame.y,
        steer.x + 5 + Math.floor(steer.width * 0.5 - frame.width * 0.5) + frame.offset_x,
        steer.y - 1 + frame.offset_y, frame.width, frame.height);
    }

    // Rendering the Explosion Object!
    let explosion = game.world.explosion;
    frame = game.world.tile_set
    frame = game.world.tile_set.frames[explosion.frame_value];

    display.drawObject(assets_manager.tile_set_image,
    frame.x, frame.y,
    explosion.x + 5 + Math.floor(explosion.width * 0.5 - frame.width * 0.5) + frame.offset_x,
    explosion.y + frame.offset_y, frame.width, frame.height);

    // Health Bar
    if (game.world.explosion.countDangerMax != 10000) {
      let left = game.world.explosion.countDangerMax - game.world.explosion.countExplosion;
      let danger = game.world.explosion.countDangerMax;

      if (left > 0.75 * danger) {
        frame = game.world.tile_set.frames[10];

      } else if (left > 0.5 * danger) {
        frame = game.world.tile_set.frames[11];

      } else if (left > 0.25 * danger) {
        frame = game.world.tile_set.frames[12];

      } else if (left > 0.02 * danger) {
        frame = game.world.tile_set.frames[13];

      } else {
        frame = game.world.tile_set.frames[14];
      }
      display.drawObject(assets_manager.tile_set_image,
        frame.x, frame.y,
        explosion.x + 5 + Math.floor(explosion.width * 0.5 - frame.width * 0.5) + frame.offset_x,
        explosion.y - 1 + frame.offset_y, frame.width, frame.height);
    }


    frame = game.world.tile_set.frames[game.world.player.frame_value];

    display.drawObject(assets_manager.tile_set_image,
    frame.x, frame.y,
    game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
    game.world.player.y + frame.offset_y, frame.width, frame.height);


    p.innerHTML = "Score: " + game.world.score;

    display.render();

  };

  var update = function() {

    if (controller.left.active ) { game.world.player.moveLeft ();                               }
    if (controller.right.active) { game.world.player.moveRight();                               }
    if (controller.up.active   ) { game.world.player.jump();      controller.up.active = false; }

    game.update();

    if (game.world.door) {

      engine.stop();

      assets_manager.requestJSON(ZONE_PREFIX + game.world.door.destination_zone + ZONE_SUFFIX, (zone) => {

        game.world.setup(zone);

        engine.start();

      });

      return;

    }

    // This ends the game
    if (game.world.over) {
      engine.stop();
      window.alert("Game Over! Final " + p.innerHTML + ". Please refresh the page to try again");
    }
  };

      /////////////////
    //// OBJECTS ////
  /////////////////

  var assets_manager = new AssetsManager();
  var controller     = new Controller();
  var display        = new Display(document.querySelector("canvas"));
  var game           = new Game();
  var engine         = new Engine(1000/30, render, update);

  var p              = document.createElement("p");
  p.setAttribute("style", "color:#FFFFFF; font-size:50px; position:fixed; margin-left: 29%; font-family: 'Chelsea Market', cursive;");
  p.innerHTML = "Score";
  document.body.appendChild(p);


      ////////////////////
    //// INITIALIZE ////
  ////////////////////

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width  = game.world.width;
  display.buffer.imageSmoothingEnabled = false;

  assets_manager.requestJSON(ZONE_PREFIX + game.world.zone_id + ZONE_SUFFIX, (zone) => {

    game.world.setup(zone);

    assets_manager.requestImage("tilesheet.png", (image) => {

      assets_manager.tile_set_image = image;

      resize();
      engine.start();

    });

  });

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup"  , keyDownUp);
  window.addEventListener("resize" , resize);

});
