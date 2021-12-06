$(function () {
  Crafty.init(document.body.clientWidth, document.body.clientHeight);

  Crafty.sprite(57, "https://alibarin.com.tr/codepen/spaceship/sprite.png", {
    spaceShip: [0, 0],
    enemyShip: [1, 0]
  });

  // bullet

  Crafty.c("bullet", {
    init: function () {
      this.addComponent("2D", "Canvas", "Dom", "Collision", "Color")
        .origin("center")
        .attr({
          x: 20,
          y: 20,
          yspeed: 5,
          h: 8,
          w: 3
        })
        .color("#ffffff")
        .bind("EnterFrame", function () {
          this.y -= this.yspeed;
        });
    }
  });

  Crafty.c("enemy", {
    init: function () {
      this.addComponent("2D", "DOM", "Color", "Tween", "enemyShip", "Collision")
        .attr({
          x: 20,
          y: 20,
          dX: 3,
          xspeed: 5,
          yspeed: 5,
          h: 50,
          w: 50
        })
        .bind("EnterFrame", function () {
          this.x += this.xspeed;

          if (this.x <= 0 || this.x >= Crafty.viewport.width - this.w) {
            this.xspeed *= -1;

            this.tween(
              {
                y: this.y + this.h
              },
              10
            );
          }
        })
        .onHit("bullet", function (bullet) {
          this.destroy();
          bullet[0].obj.destroy();
        });
    }
  });

  Crafty.scene("Loading", function () {
    Crafty.e("HTML")
      .attr({
        h: 20,
        w: 100,
        x: Crafty.viewport.width / 2 - 50,
        y: Crafty.viewport.height / 2 - 10
      })
      .append('<a id="start-game" href="javascript:;">Loading...</a>');

    Crafty.load(
      ["https://alibarin.com.tr/codepen/spaceship/sprite.png"],
      function () {
        Crafty.scene("Start");
      }
    );
  });

  Crafty.scene("Start", function () {
    Crafty.e("HTML")
      .addComponent("Mouse")
      .attr({
        h: 20,
        w: 100,
        x: Crafty.viewport.width / 2 - 50,
        y: Crafty.viewport.height / 2 - 10
      })
      .append('<a id="start-game" href="javascript:;">START</a>')
      .bind("Click", function () {
        Crafty.scene("Level 1");
      });

    Crafty.e("HTML")
      .attr({
        h: 20,
        w: 350,
        x: Crafty.viewport.width / 2 - 175,
        y: Crafty.viewport.height / 2 + 40
      })
      .append(
        "use the arrow keys to fix the broken pipes in the boiler room to save Baby Shark's home!!"
      )
      .bind("Click", function () {
        Crafty.scene("Level 1");
      });
  });

  Crafty.scene("Level 1", function () {
    // create noob enemies
    for (x = 1; x <= document.body.clientWidth / 160; x++) {
      for (y = 1; y <= 3; y++) {
        Crafty.e("enemy").attr({
          x: 80 * x,
          y: 50 * y
        });
      }
    }

    // create our nicely space ship!
    Crafty.e("hero, 2D, DOM, Multiway, Keyboard, spaceShip, Collision")
      .attr({
        x: (Crafty.viewport.width - 50) / 2,
        y: Crafty.viewport.height - 75,
        w: 50,
        h: 57
      })
      .multiway(5, { LEFT_ARROW: 180, RIGHT_ARROW: 0 })
      .bind("EnterFrame", function (dmg) {
        if (this.x > Crafty.viewport.width - 50) this.x -= 5;

        if (this.x < 0) this.x += 5;

        if (!Crafty("enemy").length) {
          Crafty.scene("Win");
        }
      })
      .bind("KeyDown", function () {
        if (this.isDown("SPACE")) {
          Crafty.e("bullet").attr({
            h: 8,
            w: 3,
            x: this.x + 50 / 2 - 1.5,
            y: this.y - 10,
            xspeed: 20,
            yspeed: 20
          });
        }
      })
      .onHit("enemy", function (enemy) {
        enemy[0].obj.destroy();
        this.destroy();

        Crafty.scene("Game Over");
      });
  });

  /* 
 Crafty.scene("Win", function () {
    Crafty.e("HTML")
      .attr({
        h: 20,
        w: 400,
        x: Crafty.viewport.width / 2 - 200,
        y: Crafty.viewport.height / 2 - 10
      })
      .append(
        '<a id="start-game" href="javascript:;">Good job! You saved Baby Shark\'s home!</a>'
      );
  });
  */

  Crafty.scene("Game Over", function () {
    Crafty.e("HTML")
      .attr({
        h: 20,
        w: 400,
        x: Crafty.viewport.width / 2 - 200,
        y: Crafty.viewport.height / 2 - 10
      })
      .append(
        '<a id="start-game" href="javascript:;">Oh no! You ran out of time! Baby Shark needs to find a new home!</a>'
      );
  });

  Crafty.scene("Loading");
});