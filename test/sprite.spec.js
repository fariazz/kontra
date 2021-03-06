// --------------------------------------------------
// kontra.vector
// --------------------------------------------------
describe('', function() {

  // --------------------------------------------------
  // kontra.vector.init
  // --------------------------------------------------
  describe('kontra.vector.init', function() {

    it('should set x and y', function() {
      var vec = kontra.vector({x: 10, y: 20});

      expect(vec.x).to.equal(10);
      expect(vec.y).to.equal(20);
    });

  });





  // --------------------------------------------------
  // kontra.vector.add
  // --------------------------------------------------
  describe('kontra.vector.add', function() {

    it('should add one vector to another', function() {
      var vec1 = kontra.vector({x: 10, y: 20});
      var vec2 = kontra.vector({x: 5, y: 10});

      vec1.add(vec2)

      expect(vec1.x).to.eql(15);
      expect(vec1.y).to.eql(30);
    });

  });

  it('should incorporate dt if passed', function() {
    var vec1 = kontra.vector({x: 10, y: 20});
      var vec2 = kontra.vector({x: 5, y: 10});

      vec1.add(vec2, 2)

      expect(vec1.x).to.eql(20);
      expect(vec1.y).to.eql(40);
  });





  // --------------------------------------------------
  // kontra.vector.clamp
  // --------------------------------------------------
  describe('kontra.vector.clamp', function() {
    var vec;

    beforeEach(function() {
      vec = kontra.vector({x: 10, y: 20});
      vec.clamp(0, 10, 50, 75);
    })

    it('should clamp the vectors x value', function() {
      vec.x = -10;

      expect(vec.x).to.equal(0);

      vec.x = 100;

      expect(vec.x).to.equal(50);
    });

    it('should clamp the vectors y value', function() {
      vec.y = -10;

      expect(vec.y).to.equal(10);

      vec.y = 100;

      expect(vec.y).to.equal(75);
    });

  });

});





// --------------------------------------------------
// kontra.sprite
// --------------------------------------------------
describe('', function() {

  // --------------------------------------------------
  // kontra.sprite.init
  // --------------------------------------------------
  describe('kontra.sprite.init', function() {

    it('should set default properties on the sprite when passed no arguments', function() {
      var sprite = kontra.sprite();

      expect(sprite.context).to.equal(kontra.context);
      expect(sprite.position instanceof kontra.vector).to.be.true;
      expect(sprite.velocity instanceof kontra.vector).to.be.true;
      expect(sprite.acceleration instanceof kontra.vector).to.be.true;
    });

    it('should set basic properties of width, height, color, x, and y', function() {
      var sprite = kontra.sprite({
        x: 10,
        y: 20,
        color: 'red',
        width: 5,
        height: 15
      });

      expect(sprite.x).to.equal(10);
      expect(sprite.y).to.equal(20);
      expect(sprite.color).to.equal('red');
      expect(sprite.width).to.equal(5);
      expect(sprite.height).to.equal(15);
      expect(sprite.advance).to.equal(sprite._advanceSprite);
      expect(sprite.draw).to.equal(sprite._drawRect);
    });

    it('should set properties of velocity, acceleration, and a different context', function() {
      var context = {foo: 'bar'};

      var sprite = kontra.sprite({
        dx: 2,
        dy: 1,
        ddx: 0.5,
        ddy: 0.2,
        context: context
      });

      expect(sprite.dx).to.equal(2);
      expect(sprite.dy).to.equal(1);
      expect(sprite.ddx).to.equal(0.5);
      expect(sprite.ddy).to.equal(0.2);
      expect(sprite.context).to.equal(context);
    });

    it('should keep the position, velocity, and acceleration vectors in sync', function() {
      var sprite = kontra.sprite();

      sprite.x = 10;
      sprite.y = 20;
      sprite.dx = 2;
      sprite.dy = 1;
      sprite.ddx = 0.5;
      sprite.ddy = 0.2;

      expect(sprite.position.x).to.equal(10);
      expect(sprite.position.y).to.equal(20);
      expect(sprite.velocity.x).to.equal(2);
      expect(sprite.velocity.y).to.equal(1);
      expect(sprite.acceleration.x).to.equal(0.5);
      expect(sprite.acceleration.y).to.equal(0.2);
    });

    it('should set the width and height of the sprite to an image if passed', function() {
      var img = new Image();
      img.width = 10;
      img.height = 20;

      var sprite = kontra.sprite({
        image: img
      });

      expect(sprite.image).to.equal(img);
      expect(sprite.width).to.equal(10);
      expect(sprite.height).to.equal(20);
      expect(sprite.advance).to.equal(sprite._advanceSprite);
      expect(sprite.draw).to.equal(sprite._drawImage);
    });

    it('should set the width and height of the sprite to an animation if passed', function() {
      // simple animation object from kontra.spriteSheet
      var animations = {
        'walk': {
          width: 10,
          height: 20
        }
      };

      var sprite = kontra.sprite({
        animations: animations
      });

      expect(sprite.animations).to.equal(animations);
      expect(sprite.currentAnimation).to.equal(animations.walk);
      expect(sprite.width).to.equal(10);
      expect(sprite.height).to.equal(20);
      expect(sprite.advance).to.equal(sprite._advanceAnimation);
      expect(sprite.draw).to.equal(sprite._drawAnimation);
    });

    it('should set all additional properties on the sprite', function() {
      var sprite = kontra.sprite({
        foo: 'bar',
        alive: true
      });

      expect(sprite.foo).to.equal('bar');
      expect(sprite.alive).to.be.true;
    });

  });





  // --------------------------------------------------
  // kontra.sprite.update
  // --------------------------------------------------
  describe('kontra.sprite.update', function() {

    it('should move a rect sprite by its velocity and acceleration', function() {
      var sprite = kontra.sprite({
        x: 10,
        y: 20,
        dx: 2,
        dy: 1,
        ddx: 0.5,
        ddy: 0.2
      });

      sprite.update();

      expect(sprite.dx).to.equal(2.5);
      expect(sprite.dy).to.equal(1.2);
      expect(sprite.x).to.equal(12.5);
      expect(sprite.y).to.equal(21.2);
    });

    it('should move an image sprite by its velocity and acceleration', function() {
      var img = new Image();
      img.width = 10;
      img.height = 20;

      var sprite = kontra.sprite({
        x: 10,
        y: 20,
        dx: 2,
        dy: 1,
        ddx: 0.5,
        ddy: 0.2,
        image: img
      });

      sprite.update();

      expect(sprite.dx).to.equal(2.5);
      expect(sprite.dy).to.equal(1.2);
      expect(sprite.x).to.equal(12.5);
      expect(sprite.y).to.equal(21.2);
    });

    it('should move an animation sprite by its velocity and acceleration', function() {
      // simple animation object from kontra.spriteSheet
      var animations = {
        'walk': {
          width: 10,
          height: 20,
          update: kontra.noop
        }
      };

      var sprite = kontra.sprite({
        x: 10,
        y: 20,
        dx: 2,
        dy: 1,
        ddx: 0.5,
        ddy: 0.2,
        animations: animations
      });

      sprite.update();

      expect(sprite.dx).to.equal(2.5);
      expect(sprite.dy).to.equal(1.2);
      expect(sprite.x).to.equal(12.5);
      expect(sprite.y).to.equal(21.2);
    });

  });





  // --------------------------------------------------
  // kontra.sprite.render
  // --------------------------------------------------
  describe('kontra.sprite.render', function() {

    it('should draw a rect sprite', function() {
      var sprite = kontra.sprite({
        x: 10,
        y: 20,
      });

      sinon.stub(sprite.context, 'fillRect', kontra.noop);

      sprite.render();

      expect(sprite.context.fillRect.called).to.be.ok;

      sprite.context.fillRect.restore();
    });

    it('should draw an image sprite', function() {
      var img = new Image();
      img.width = 10;
      img.height = 20;

      var sprite = kontra.sprite({
        x: 10,
        y: 20,
        image: img
      });

      sinon.stub(sprite.context, 'drawImage', kontra.noop);

      sprite.render();

      expect(sprite.context.drawImage.called).to.be.ok;

      sprite.context.drawImage.restore();
    });

    it('should draw an animation sprite', function() {
      // simple animation object from kontra.spriteSheet
      var animations = {
        'walk': {
          width: 10,
          height: 20,
          update: kontra.noop,
          render: kontra.noop
        }
      };

      var sprite = kontra.sprite({
        x: 10,
        y: 20,
        animations: animations
      });

      sinon.stub(sprite.currentAnimation, 'render', kontra.noop);

      sprite.render();

      expect(sprite.currentAnimation.render.called).to.be.ok;

      sprite.currentAnimation.render.restore();
    });

  });





  // --------------------------------------------------
  // kontra.sprite.collidesWith
  // --------------------------------------------------
  describe('kontra.sprite.collidesWith', function() {

    it('should correctly detect collision between two objects', function() {
      var sprite1 = kontra.sprite({
        x: 10,
        y: 20,
        width: 10,
        height: 20
      });

      var sprite2 = kontra.sprite({
        x: 19,
        y: 39,
        width: 10,
        height: 20
      });

      expect(sprite1.collidesWith(sprite2)).to.be.true;

      sprite2.x = 10;
      sprite2.y = 20;

      expect(sprite1.collidesWith(sprite2)).to.be.true;

      sprite2.x = 1;
      sprite2.y = 1;

      expect(sprite1.collidesWith(sprite2)).to.be.true;

      sprite2.x = 20;
      sprite2.y = 40;

      expect(sprite1.collidesWith(sprite2)).to.be.false;

      sprite2.x = 0;
      sprite2.y = 0;

      expect(sprite1.collidesWith(sprite2)).to.be.false;
    });

  });





  // --------------------------------------------------
  // kontra.sprite.isAlive
  // --------------------------------------------------
  describe('kontra.sprite.isAlive', function() {

    it('should return true when the sprite is alive', function() {
      var sprite = kontra.sprite();

      expect(sprite.isAlive()).to.be.false;

      sprite.timeToLive = 1;

      expect(sprite.isAlive()).to.be.true;

      sprite.timeToLive = -0;

      expect(sprite.isAlive()).to.be.false;
    });

  });





  // --------------------------------------------------
  // kontra.sprite.playAnimation
  // --------------------------------------------------
  describe('kontra.sprite.playAnimation', function() {

    it('should set the animation to play', function() {
      var animations = {
        'walk': {
          width: 10,
          height: 20
        },
        'idle': {
          width: 10,
          height: 20
        }
      };

      var sprite = kontra.sprite({
        animations: animations
      });

      expect(sprite.currentAnimation).to.equal(animations.walk);

      sprite.playAnimation('idle');

      expect(sprite.currentAnimation).to.equal(animations.idle);
    });

  });

});