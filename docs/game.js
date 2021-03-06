// This file houses all the game objects

var explosion1 = new Audio('media/explosion.mp3')
var explosion2 = new Audio('media/explosion.mp3')
var explosion3 = new Audio('media/explosion.mp3')
var explosion4 = new Audio('media/explosion.mp3')
explosion1.volume = 0.5;
explosion2.volume = 0.5;
explosion3.volume = 0.5;
explosion4.volume = 0.5;

const Game = function() {

  this.world    = new Game.World();

  this.update   = function() {

    this.world.update();

  };

};
Game.prototype = { constructor : Game };

// Made the default animation type "loop":
Game.Animator = function(frame_set, delay, mode = "loop") {

 this.count       = 0;
 this.delay       = (delay >= 1) ? delay : 1;
 this.frame_set   = frame_set;
 this.frame_index = 0;
 this.frame_value = frame_set[0];
 this.mode        = mode;

};
Game.Animator.prototype = {

 constructor:Game.Animator,

 animate:function() {

   switch(this.mode) {

     case "loop" : this.loop(); break;
     case "pause":              break;

   }

 },

 changeFrameSet(frame_set, mode, delay = 10, frame_index = 0) {

   if (this.frame_set === frame_set) { return; }

   this.count       = 0;
   this.delay       = delay;
   this.frame_set   = frame_set;
   this.frame_index = frame_index;
   this.frame_value = frame_set[frame_index];
   this.mode        = mode;

 },

 loop:function() {

   this.count ++;

   while(this.count > this.delay) {

     this.count -= this.delay;

     this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;

     this.frame_value = this.frame_set[this.frame_index];

   }

 }

};

Game.Collider = function() {

  this.collide = function(value, object, tile_x, tile_y, tile_size) {

    switch(value) {

      case  1:     this.collidePlatformTop    (object, tile_y            ); break;
      case  2:     this.collidePlatformRight  (object, tile_x + tile_size); break;
      case  3: if (this.collidePlatformTop    (object, tile_y            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case  4:     this.collidePlatformBottom (object, tile_y + tile_size); break;
      case  5: if (this.collidePlatformTop    (object, tile_y            )) return;
                   this.collidePlatformBottom (object, tile_y + tile_size); break;
      case  6: if (this.collidePlatformRight  (object, tile_x + tile_size)) return;
                   this.collidePlatformBottom (object, tile_y + tile_size); break;
      case  7: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case  8:     this.collidePlatformLeft   (object, tile_x            ); break;
      case  9: if (this.collidePlatformTop    (object, tile_y            )) return;
                   this.collidePlatformLeft   (object, tile_x            ); break;
      case 10: if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case 11: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case 12: if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
                   this.collidePlatformLeft   (object, tile_x            ); break;
      case 13: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
                   this.collidePlatformLeft   (object, tile_x            ); break;
      case 14: if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
               if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;
      case 15: if (this.collidePlatformTop    (object, tile_y            )) return;
               if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
               if (this.collidePlatformLeft   (object, tile_x            )) return;
                   this.collidePlatformRight  (object, tile_x + tile_size); break;

    }

  }

};
Game.Collider.prototype = {

  constructor: Game.Collider,

  collidePlatformBottom:function(object, tile_bottom) {

    if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {

      object.setTop(tile_bottom);
      object.velocity_y = 0;
      return true;

    } return false;

  },

  collidePlatformLeft:function(object, tile_left) {

    if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {

      object.setRight(tile_left - 0.01);
      object.velocity_x = 0;
      return true;

    } return false;

  },

  collidePlatformRight:function(object, tile_right) {

    if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {

      object.setLeft(tile_right);
      object.velocity_x = 0;
      return true;

    } return false;

  },

  collidePlatformTop:function(object, tile_top) {

    if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {

      object.setBottom(tile_top - 0.01);
      object.velocity_y = 0;
      object.jumping    = false;
      return true;

    } return false;

  }

 };

// Added default values of 0 for offset_x and offset_y
Game.Frame = function(x, y, width, height, offset_x = 0, offset_y = 0) {

  this.x        = x;
  this.y        = y;
  this.width    = width;
  this.height   = height;
  this.offset_x = offset_x;
  this.offset_y = offset_y;

};
Game.Frame.prototype = { constructor: Game.Frame };

Game.Object = function(x, y, width, height) {

 this.height = height;
 this.width  = width;
 this.x      = x;
 this.y      = y;

};
Game.Object.prototype = {

  constructor:Game.Object,

  // Rectangular collision
  collideObject:function(object) {

    if (this.getRight()  < object.getLeft()  ||
        this.getBottom() < object.getTop()   ||
        this.getLeft()   > object.getRight() ||
        this.getTop()    > object.getBottom()) return false;

    return true;

  },

  // Rectangular collision with center of the object
  collideObjectCenter:function(object) {

    let center_x = object.getCenterX();
    let center_y = object.getCenterY();

    if (center_x < this.getLeft() || center_x > this.getRight() ||
        center_y < this.getTop()  || center_y > this.getBottom()) return false;

    return true;

  },

  getBottom : function()  { return this.y + this.height;       },
  getCenterX: function()  { return this.x + this.width  * 0.5; },
  getCenterY: function()  { return this.y + this.height * 0.5; },
  getLeft   : function()  { return this.x;                     },
  getRight  : function()  { return this.x + this.width;        },
  getTop    : function()  { return this.y;                     },
  setBottom : function(y) { this.y = y - this.height;          },
  setCenterX: function(x) { this.x = x - this.width  * 0.5;    },
  setCenterY: function(y) { this.y = y - this.height * 0.5;    },
  setLeft   : function(x) { this.x = x;                        },
  setRight  : function(x) { this.x = x - this.width;           },
  setTop    : function(y) { this.y = y;                        }

};

Game.MovingObject = function(x, y, width, height, velocity_max = 15) {

  Game.Object.call(this, x, y, width, height);

  this.jumping      = false;
  this.velocity_max = velocity_max;// added velocity_max so velocity can't go past 16
  this.velocity_x   = 0;
  this.velocity_y   = 0;
  this.x_old        = x;
  this.y_old        = y;

};

Game.MovingObject.prototype = {

  getOldBottom : function()  { return this.y_old + this.height;       },
  getOldCenterX: function()  { return this.x_old + this.width  * 0.5; },
  getOldCenterY: function()  { return this.y_old + this.height * 0.5; },
  getOldLeft   : function()  { return this.x_old;                     },
  getOldRight  : function()  { return this.x_old + this.width;        },
  getOldTop    : function()  { return this.y_old;                     },
  setOldBottom : function(y) { this.y_old = y    - this.height;       },
  setOldCenterX: function(x) { this.x_old = x    - this.width  * 0.5; },
  setOldCenterY: function(y) { this.y_old = y    - this.height * 0.5; },
  setOldLeft   : function(x) { this.x_old = x;                        },
  setOldRight  : function(x) { this.x_old = x    - this.width;        },
  setOldTop    : function(y) { this.y_old = y;                        }

};
Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;



// Lights Event
Game.Lights = function(x, y) {

  Game.Object.call(this, x, y, 7, 14);
  Game.Animator.call(this, Game.Lights.prototype.frame_sets["safe"], 20);

  this.frame_index = Math.floor(Math.random() * 2);

  this.x = x;
  this.y = y;
  this.danger = true;


  this.countLights = 0;
  this.countDangerMax = 10000;
  this.countSafeMax = 10000;

  // Checks if player is inside lights object
  this.inside = false;


  this.generateSafeMax();
};

Game.Lights.prototype = {
  frame_sets : { 
    "danger":[8, 9],
    "safe": [6, 7]
  },

  toggleSafe:function() {
    Game.Animator.call(this, Game.Lights.prototype.frame_sets["safe"], 20);
    this.danger = false;
  },
  toggleDanger:function() {
    Game.Animator.call(this, Game.Lights.prototype.frame_sets["danger"], 20);
    explosion1.play();
    this.danger = true;
  },
  killGame:function() {
    console.log("Game Over!")
  },
  generateDangerMax:function() {
    this.countDangerMax = Math.floor(Math.random() * 301 + 100);
  },
  generateSafeMax: function() {
    this.countSafeMax = Math.floor(Math.random() * 301 + 100);
  }



};
Object.assign(Game.Lights.prototype, Game.Animator.prototype);
Object.assign(Game.Lights.prototype, Game.Object.prototype);
Game.Lights.prototype.constructor = Game.Lights;


// Leak Event
Game.Leak = function(x, y) {

  Game.Object.call(this, x, y, 7, 14);
  Game.Animator.call(this, Game.Lights.prototype.frame_sets["safe"], 18);

  this.frame_index = Math.floor(Math.random() * 2);

  this.x = x;
  this.y = y;
  this.danger = true;


  this.countLeak = 0;
  this.countDangerMax = 10000;
  this.countSafeMax = 10000;

  // Checks if player is inside Leak object
  this.inside = false;


  this.generateSafeMax();
};

Game.Leak.prototype = {
  frame_sets : { 
    "danger":[8, 9],
    "safe": [6, 7]
  },

  toggleSafe:function() {
    Game.Animator.call(this, Game.Leak.prototype.frame_sets["safe"], 18);
    this.danger = false;
  },
  toggleDanger:function() {
    Game.Animator.call(this, Game.Leak.prototype.frame_sets["danger"], 18);
    explosion2.play();
    this.danger = true;
  },
  killGame:function() {
    console.log("Game Over!")
  },
  generateDangerMax:function() {
    this.countDangerMax = Math.floor(Math.random() * 301 + 100);
  },
  generateSafeMax: function() {
    this.countSafeMax = Math.floor(Math.random() * 301 + 100);
  }



};
Object.assign(Game.Leak.prototype, Game.Animator.prototype);
Object.assign(Game.Leak.prototype, Game.Object.prototype);
Game.Leak.prototype.constructor = Game.Leak;



// Steer Event
Game.Steer = function(x, y) {

  Game.Object.call(this, x, y, 7, 14);
  Game.Animator.call(this, Game.Steer.prototype.frame_sets["safe"], 15);

  this.frame_index = Math.floor(Math.random() * 2);

  this.x = x;
  this.y = y;
  this.danger = true;


  this.countSteer = 0;
  this.countDangerMax = 10000;
  this.countSafeMax = 10000;

  // Checks if player is inside steer object
  this.inside = false;


  this.generateSafeMax();
};

Game.Steer.prototype = {
  frame_sets : { 
    "danger":[8, 9],
    "safe": [6, 7]
  },

  toggleSafe:function() {
    Game.Animator.call(this, Game.Steer.prototype.frame_sets["safe"], 15);
    this.danger = false;
  },
  toggleDanger:function() {
    Game.Animator.call(this, Game.Steer.prototype.frame_sets["danger"], 15);
    explosion3.play();
    this.danger = true;
  },
  killGame:function() {
    console.log("Game Over!")
  },
  generateDangerMax:function() {
    this.countDangerMax = Math.floor(Math.random() * 301 + 100);
  },
  generateSafeMax: function() {
    this.countSafeMax = Math.floor(Math.random() * 301 + 100);
  }



};
Object.assign(Game.Steer.prototype, Game.Animator.prototype);
Object.assign(Game.Steer.prototype, Game.Object.prototype);
Game.Steer.prototype.constructor = Game.Steer;



// Explosion Event
Game.Explosion = function(x, y) {

  Game.Object.call(this, x, y, 7, 14);
  Game.Animator.call(this, Game.Explosion.prototype.frame_sets["safe"], 22);

  this.frame_index = Math.floor(Math.random() * 2);

  this.x = x;
  this.y = y;
  this.danger = true;


  this.countExplosion = 0;
  this.countDangerMax = 10000;
  this.countSafeMax = 10000;

  // Checks if player is inside explosion object
  this.inside = false;


  this.generateSafeMax();
};

Game.Explosion.prototype = {
  frame_sets : { 
    "danger":[8, 9],
    "safe": [6, 7]
  },

  toggleSafe:function() {
    Game.Animator.call(this, Game.Explosion.prototype.frame_sets["safe"], 22);
    this.danger = false;
  },
  toggleDanger:function() {
    Game.Animator.call(this, Game.Explosion.prototype.frame_sets["danger"], 22);
    explosion4.play();
    this.danger = true;
  },
  killGame:function() {
    console.log("Game Over!")
  },
  generateDangerMax:function() {
    this.countDangerMax = Math.floor(Math.random() * 301 + 100);
  },
  generateSafeMax: function() {
    this.countSafeMax = Math.floor(Math.random() * 301 + 100);
  }



};
Object.assign(Game.Explosion.prototype, Game.Animator.prototype);
Object.assign(Game.Explosion.prototype, Game.Object.prototype);
Game.Explosion.prototype.constructor = Game.Explosion;







Game.Player = function(x, y) {

  Game.MovingObject.call(this, x, y, 14, 14);

  Game.Animator.call(this, Game.Player.prototype.frame_sets["idle-left"], 10);

  this.jumping     = true;
  this.direction_x = -1;
  this.velocity_x  = 0;
  this.velocity_y  = 0;

};
Game.Player.prototype = {

  frame_sets: {

    "idle-left" : [0],
    "jump-left" : [1],
    "move-left" : [2],
    "idle-right": [3],
    "jump-right": [4],
    "move-right": [5],

  },

  jump: function() {

    if (!this.jumping && this.velocity_y < 10) {

      this.jumping     = true;
      this.velocity_y -= 13;

    }

  },

  moveLeft: function() {

    this.direction_x = -1;
    this.velocity_x -= 0.55;

  },

  moveRight:function(frame_set) {

    this.direction_x = 1;
    this.velocity_x += 0.55;

  },

  updateAnimation:function() {

    if (this.velocity_y < 0) {

      if (this.direction_x < 0) this.changeFrameSet(this.frame_sets["jump-left"], "pause");
      else this.changeFrameSet(this.frame_sets["jump-right"], "pause");

    } else if (this.direction_x < 0) {

      if (this.velocity_x < -0.1) this.changeFrameSet(this.frame_sets["move-left"], "loop", 5);
      else this.changeFrameSet(this.frame_sets["idle-left"], "pause");

    } else if (this.direction_x > 0) {

      if (this.velocity_x > 0.1) this.changeFrameSet(this.frame_sets["move-right"], "loop", 5);
      else this.changeFrameSet(this.frame_sets["idle-right"], "pause");

    }

    this.animate();

  },

  updatePosition:function(gravity, friction) {

    this.x_old = this.x;
    this.y_old = this.y;

    this.velocity_y += gravity;
    this.velocity_x *= friction;

    if (Math.abs(this.velocity_x) > this.velocity_max)
    this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_max)
    this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

    this.x    += this.velocity_x;
    this.y    += this.velocity_y;

  }

};
Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Object.assign(Game.Player.prototype, Game.Animator.prototype);
Game.Player.prototype.constructor = Game.Player;

Game.TileSet = function(columns, tile_size) {

  this.columns    = columns;
  this.tile_size  = tile_size;

  let f = Game.Frame;

  this.frames = [new f(49, 1, 14, 14, 0, 0), // idle-left
    new f(65, 1, 14, 14, 0, 0), // jump-left
    new f(97, 1, 14, 14, 0, 0), // walk-left
    new f(49, 1, 14, 14, 0, 0), // idle-right
    new f(65, 1, 14, 14, 0, 0), // jump-right
    new f(81, 1, 14, 14, 0, 0), // walk-right
    new f(0, 16, 14, 14, 0, 0), new f(129, 0, 14, 14, 0, 0), //lights-safe
    new f(0, 16, 14, 14, 0, 0), new f(113, 0, 14, 14, 0, 0),  //lights-danger
    new f(16, 16, 16, 16, 0, 0), // Full
    new f(32, 16, 16, 16, 0, 0), // 3/4
    new f(48, 16, 16, 16, 0, 0), // 1/2
    new f(64, 16, 16, 16, 0, 0), // 1/4
    new f(80, 16, 16, 16, 0, 0), // empty
];

};
Game.TileSet.prototype = { constructor: Game.TileSet };

Game.World = function(friction = 0.85, gravity = 2) {

  this.collider     = new Game.Collider();

  this.friction     = friction;
  this.gravity      = gravity;

  this.columns      = 12;
  this.rows         = 9;

  this.tile_set     = new Game.TileSet(8, 16);
  this.player       = new Game.Player(32, 76);

  this.zone_id      = "00";


  this.height       = this.tile_set.tile_size * this.rows;
  this.width        = this.tile_set.tile_size * this.columns;

  this.score        = 0;
  this.over = false;

  this.over = false;

};
Game.World.prototype = {


  constructor: Game.World,

  // Collision with tiles
  collideObject:function(object) {

    var bottom, left, right, top, value;

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

  },

  setup:function(zone) {

    this.collision_map      = zone.collision_map;
    this.graphical_map      = zone.graphical_map;
    this.columns            = zone.columns;
    this.rows               = zone.rows;
    this.zone_id            = zone.id;
    this.lights             = new Game.Lights(zone.lights[0] * this.tile_set.tile_size, zone.lights[1] * this.tile_set.tile_size + 2);
    this.leak               = new Game.Leak(zone.leak[0] * this.tile_set.tile_size, zone.leak[1] * this.tile_set.tile_size + 2);
    this.steer              = new Game.Steer(zone.steer[0] * this.tile_set.tile_size, zone.steer[1] * this.tile_set.tile_size + 2);
    this.explosion          = new Game.Explosion(zone.explosion[0] * this.tile_set.tile_size, zone.explosion[1] * this.tile_set.tile_size + 2);

  },

  update:function() {

    this.player.updatePosition(this.gravity, this.friction);


    this.collideObject(this.player);






    // Lights Functionality

    this.lights.animate();

    // Checking for lights event
    if (this.lights.countLights == this.lights.countSafeMax) {
      // Checks for lights safe time is up
      this.lights.countLights = 0;
      this.lights.countSafeMax = 10000;
      this.lights.toggleDanger();
      this.lights.generateDangerMax();
      this.lights.danger = true;

      // Saving it during danger time
    } else if (this.lights.countLights <= this.lights.countDangerMax && this.lights.danger) {
      
      if (this.lights.collideObject(this.player) && !this.lights.inside) {
        this.lights.inside = true;

        this.lights.danger = false;
        this.lights.toggleSafe();
        this.lights.countLights = 0;
        this.lights.countDangerMax = 10000;
        this.lights.generateSafeMax();

      } else if (!this.lights.collideObject(this.player)) {
        this.lights.inside = false;
      }

      // Failing to save in time, game over!
    } else if (this.lights.countLights > this.lights.countDangerMax) {
      
      // Ending Game
      this.over = true;
    }


        // Checking for leak event
        this.leak.animate();
        if (this.leak.countLeak == this.leak.countSafeMax) {
      
          this.leak.countLeak = 0;
          this.leak.countSafeMax = 10000;
          this.leak.toggleDanger();
          this.leak.generateDangerMax();
          this.leak.danger = true;
    
          // Saving it during danger time
        } else if (this.leak.countLeak <= this.leak.countDangerMax && this.leak.danger) {
          
          if (this.leak.collideObject(this.player) && !this.leak.inside) {
            this.leak.inside = true;
    
            this.leak.danger = false;
            this.leak.toggleSafe();
            this.leak.countLeak = 0;
            this.leak.countDangerMax = 10000;
            this.leak.generateSafeMax();

          } else if (!this.leak.collideObject(this.player)) {
            this.leak.inside = false;
          }
    
          // Failing to save in time, game over!
        } else if (this.leak.countLeak > this.leak.countDangerMax) {
          // Ending Game
          this.over = true;
        }


      
        // Checking for steer event
        this.steer.animate();
        if (this.steer.countSteer == this.steer.countSafeMax) {
      
          this.steer.countSteer = 0;
          this.steer.countSafeMax = 10000;
          this.steer.toggleDanger();
          this.steer.generateDangerMax();
          this.steer.danger = true;
    
          // Saving it during danger time
        } else if (this.steer.countSteer <= this.steer.countDangerMax && this.steer.danger) {
          
          if (this.steer.collideObject(this.player) && !this.steer.inside) {
            this.steer.inside = true;
    
            this.steer.danger = false;
            this.steer.toggleSafe();
            this.steer.countSteer = 0;
            this.steer.countDangerMax = 10000;
            this.steer.generateSafeMax();
    
          } else if (!this.steer.collideObject(this.player)) {
            this.steer.inside = false;
          }
    
          // Failing to save in time, game over!
        } else if (this.steer.countSteer > this.steer.countDangerMax) {
          
          // Ending Game
          this.over = true;
        }

        // Checking for explosion event
        this.explosion.animate();
        if (this.explosion.countExplosion == this.explosion.countSafeMax) {
      
          this.explosion.countExplosion = 0;
          this.explosion.countSafeMax = 10000;
          this.explosion.toggleDanger();
          this.explosion.generateDangerMax();
          this.explosion.danger = true;
    
          // Saving it during danger time
        } else if (this.explosion.countExplosion <= this.explosion.countDangerMax && this.explosion.danger) {
          
          if (this.explosion.collideObject(this.player) && !this.explosion.inside) {
            this.explosion.inside = true;
    
            this.explosion.danger = false;
            this.explosion.toggleSafe();
            this.explosion.countExplosion = 0;
            this.explosion.countDangerMax = 10000;
            this.explosion.generateSafeMax();
    
          } else if (!this.explosion.collideObject(this.player)) {
            this.explosion.inside = false;
          }
    
          // Failing to save in time, game over!
        } else if (this.explosion.countExplosion > this.explosion.countDangerMax) {
          
          // Ending Game
          this.over = true;
        }

    this.player.updateAnimation();



    this.lights.countLights++;
    this.leak.countLeak++;
    this.steer.countSteer++;
    this.explosion.countExplosion++;
    this.score++;

  }

};
