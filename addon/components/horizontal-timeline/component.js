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
  drawLanes(){
    const ctx = this.element.getContext('2d');

    ctx.strokeStyle = "#000000";
    ctx.strokeWidth = 1;

    ctx.beginPath();

    var x = null;
    const yearSpan = this.get('endYear') - this.get('startYear');
    const laneSize = Math.floor(this.element.width / (yearSpan / 50));
    const numLanes = Math.floor(this.element.width / laneSize);

    for (let i = 1; i <= numLanes; i++) {
      x = (i * laneSize);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.element.height - 30);
      ctx.stroke();
      ctx.fillStyle = "#000000";
      ctx.font = "normal normal 14px Helvetica";
      ctx.textBaseline = "middle"; // how to align the text vertically
      ctx.textAlign = "center"; // how to align the text horizontally
      const label = String(this.get('startYear') + i * 50);
      ctx.fillText(label, x, this.element.height - 10); // text, x, y
    }

    ctx.closePath();
  }
});
