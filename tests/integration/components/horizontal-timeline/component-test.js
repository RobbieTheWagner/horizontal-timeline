import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('horizontal-timeline', 'Integration | Component | horizontal timeline', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{horizontal-timeline}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#horizontal-timeline}}
      template block text
    {{/horizontal-timeline}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
