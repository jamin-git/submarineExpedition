$(function () {
    Crafty.init(document.body.clientWidth, document.body.clientHeight);

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
});