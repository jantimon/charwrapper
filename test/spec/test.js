/*global describe, it, expect, charwrapper, jQuery */

(function ($) {
  'use strict';

  function createDemoElement() {
      var demoDomElement = document.createElement('div');
      demoDomElement.innerHTML = [
        '<table>',
        '  <tr>',
        '    <td>Hey</td>',
        '    <td>how</td>',
        '    <td>are</td>',
        '    <td>',
        '      <span>you</span><strong>?</strong>',
        '    </td>',
        '  </tr>',
        '</table>'
      ].join('\n');
      return demoDomElement;
    }


    describe('charwrapper', function () {

        describe('textNode checker', function() {
          it('should detect that a dom element is not a text node', function () {
            expect(charwrapper.isTextNode(createDemoElement())).toBe(false);
          });
          it('should detect that a text node is a text node', function () {
            expect(charwrapper.isTextNode(document.createTextNode('data'))).toBe(true);
          });
        });

        describe('wrapper', function() {
          it('should wrap all chars', function () {
            var demo = createDemoElement();
            charwrapper.wrap(demo);
            expect($('.char', demo).length).toBe(13);
          });
          it('should store all spans for the unwrapping', function () {
            var demo = createDemoElement();
            charwrapper.wrap(demo);
            expect(demo.dataCharwrapper.spans.length).toBe(13);
            document.body.appendChild(demo);
          });

        });

        describe('unwrapper', function() {
          it('should unwrap all chars', function () {
            var demo = createDemoElement();
            charwrapper.wrap(demo);
            charwrapper.unwrap(demo);
            expect($('.char', demo).length).toBe(0);
            document.body.appendChild(demo);
          });

        });

    });

})(jQuery);
