import Ember from 'ember';
const {$, Component, computed} = Ember;

export default Component.extend({
  tagName: 'canvas',
  classNames: ['timeline'],
  startYear: computed.alias('model.0.birth'),
  endYear: 2016,
  didInsertElement(){
    this.element.height = document.documentElement.clientHeight - 100;
    this.element.width = document.documentElement.clientWidth - 100;
    this.drawLanes();
  },
  drawLanes() {
    const ctx = this.element.getContext('2d');

    ctx.strokeStyle = "#000000";
    ctx.strokeWidth = 1;

    ctx.beginPath();

    const yearSpan = this.get('endYear') - this.get('startYear');
    const laneSize = Math.floor(this.element.width / (yearSpan / 50));
    const numLanes = Math.floor(this.element.width / laneSize);

    for (let i = 1; i <= numLanes; i++) {
      const x = (i * laneSize);
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
    const label = String(this.get('startYear') + i * 50);
    ctx.fillText(label, x, this.element.height - 10);
  }
});
