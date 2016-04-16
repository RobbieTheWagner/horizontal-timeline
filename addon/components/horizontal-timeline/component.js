import Ember from 'ember';
const {$, Component, computed} = Ember;

export default Component.extend({
  tagName: 'canvas',
  classNames: ['timeline'],
  endYear: 2016,
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
    people.forEach((person) => {
      const startX = (person.birth - this.get('startYear')) * this.get('pixelWidthForYear') + this.get('xOffset');
      const startY = 0;
      const death = person.death !== Infinity ? person.death : 2016;
      const lifespan = death - person.birth;
      const width = lifespan * this.get('pixelWidthForYear');
      const height = 100;
      ctx.rect(startX, startY, width, height);
      ctx.stroke();
    });
  }
});
