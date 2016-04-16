import Ember from 'ember';
const {$, Component, computed, Object} = Ember;

const Rectangle = Object.extend({
  x: null,
  y: null,
  height: null,
  text: null,
  width: null,
  intersects(rect) {
    if (rect.x < this.x + this.width && this.x < rect.x + rect.width && rect.y < this.y + this.height) {
      return this.y < rect.y + rect.height;
    }
    else {
      return false;
    }
  }
});

export default Component.extend({
  tagName: 'canvas',
  classNames: ['timeline'],
  endYear: 2016,
  rectangles: [],
  xOffset: 15,
  pixelWidthForYear: computed('model', function() {
    return document.documentElement.clientWidth / this.get('yearSpan');
  }),
  startYear: computed.alias('model.0.birth'),
  yearSpan: computed('startYear', 'endYear', function() {
    return this.get('endYear') - this.get('startYear') + 30;
  }),
  didInsertElement(){
    this.element.height = document.documentElement.clientHeight;
    this.element.width = document.documentElement.clientWidth;
    this.set('ctx', this.element.getContext('2d'))
    this.drawLanes();
    this.drawRectangles();
  },
  drawLanes() {
    const ctx = this.get('ctx');

    ctx.strokeStyle = "#000000";
    ctx.strokeWidth = 1;

    ctx.beginPath();

    const yearSpan = this.get('yearSpan');
    const laneSize = this.get('pixelWidthForYear') * 25;
    const numLanes = Math.floor(this.element.width / laneSize);

    for (let i = 0; i <= numLanes; i++) {
      const x = (i * laneSize) + this.get('xOffset');
      this.drawLines(ctx, x);
      this.labelLines(ctx, i, x);
    }

    ctx.closePath();
  },
  drawLines(ctx, x){
    ctx.moveTo(x, 0);
    ctx.lineTo(x, this.element.height - 30);
    ctx.stroke();
  },
  labelLines(ctx, i, x){
    ctx.fillStyle = "#000000";
    ctx.font = "normal normal 14px Helvetica";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    const label = String(this.get('startYear') + i * 25);
    ctx.fillText(label, x, this.element.height - 10);
  },
  drawRectangles() {
    const ctx = this.get('ctx');
    const people = this.get('model');
    this.set('rectangleHeight', this.element.height / 50);
    people.forEach((person) => {
      const x = (person.birth - this.get('startYear')) * this.get('pixelWidthForYear') + this.get('xOffset');
      const death = person.death !== Infinity ? person.death : 2016;
      const lifespan = death - person.birth;
      const width = lifespan * this.get('pixelWidthForYear');
      const newRectangle = Rectangle.create({
        x,
        y: 0,
        height: this.get('rectangleHeight'),
        text: person.name,
        width
      });
      this.checkForIntersection(newRectangle);
      this.get('rectangles').push(newRectangle);
    });
    this.get('rectangles').forEach((rect) => {
      ctx.beginPath();
      ctx.fillStyle="#6FC6F7";
      ctx.strokeStyle="#000000";
      ctx.strokeWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      ctx.closePath();
      ctx.fillStyle="#000000";
      const textWidth = ctx.measureText(rect.text).width;
      const textHeight = ctx.measureText('w').width;
      const textX = rect.x + textWidth / 2;
      ctx.fillText(rect.text, textX, rect.y + (textHeight / 2));
    })
  },
  checkForIntersection(newRectangle) {
    this.get('rectangles').forEach((rect) => {
      if (newRectangle.intersects(rect)) {
        newRectangle.set('y', rect.y + this.get('rectangleHeight'));
        return newRectangle;
      }
    });
  }
})
;
