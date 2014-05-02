var charwrapper = (function () {
  'use strict';

  /**
   * Returns true if the node is a text node
   *
   * @param node
   * @returns {boolean}
   */
  function isTextNode(node) {
    return node.nodeType === 3;
  }

  /**
   * The public function to wrap an element
   *
   * @param element
   *  The element which contains the text
   *
   * @param includeAllSpaces
   *  By default all spaces are ignored. Set this flag to true
   *  to include spaces
   *
   * @returns context
   */
  function wrap(element, includeAllSpaces) {
    var context = {spans: [], spanGroups: []};
    element.dataCharwrapper = context;
    return recursiveWrap(element, includeAllSpaces, context);
  }

  /**
   * The public function to undo everything the `wrap` function did.
   * @see wrap
   *
   * @param element
   *  The element which contains the wrapped text
   * @param context - Optional
   */
  function unwrap(element, context) {
    if (context === undefined) {
      context = element.dataCharwrapper;
      delete(element.dataCharwrapper);
    }
    // Iterate over the context if it is available
    if (context && context.spanGroups) {
      for (var i = 0; i < context.spanGroups.length; i++) {
        unwrapSpanGroup(context.spanGroups[i]);
      }
    }
  }

  /**
   * Called by wrap to iterate recursively over all nodes
   *
   * @param {DOM node} element
   *  The element which contains the text
   *
   * @param {boolean} includeAllSpaces
   *  By default all spaces are ignored. Set this flag to true
   *  to include spaces
   *
   * @param {object} context
   *  A helper object to track the spans which are created.
   *  This context is useful for unwrapping the text again
   *
   * @see wrap
   *
   */
  function recursiveWrap(element, includeAllSpaces, context) {
    var node;
    // Turn node list into an array to prevent
    // iterating over the new created spans
    var nodes = getNodeArray(element.childNodes);
    // Iterate over all nodes
    for (var i = 0; i < nodes.length; i++) {
      node = nodes[i];
      // Replace text nodes with spans
      if (isTextNode(node)) {
        replaceTextNode(node, includeAllSpaces, context);
      }
      // Recursively iterate over dom elements
      else {
        recursiveWrap(node, includeAllSpaces, context);
      }
    }
    return context;
  }

  /**
   * Turns a node list into a node array
   * @param nodes
   * @returns {Array}
   */
  function getNodeArray(nodes) {
    var nodeList = [];
    for (var i = 0; i < nodes.length; i++) {
      nodeList.push(nodes[i]);
    }
    return nodeList;
  }

  /**
   * Replaces the given textNode by multiple of spans
   *
   * @param node
   * @param includeAllSpaces
   * @param {object} context
   *
   */
  function replaceTextNode(node, includeAllSpaces, context) {
    var text = (node.nodeValue);

    // Skip empty texts
    if (!includeAllSpaces && /^\s*$/.test(text)) {
      return;
    }

    var spans = textToSpans(text, context);
    node.parentNode.replaceChild(spans, node);

    return spans;
  }

  /**
   * Turns the given text into a dom fragment with a span for
   * every char
   *
   * @param text
   * @param context
   * @returns {DocumentFragment}
   */
  function textToSpans(text, context) {
    var wrapper = document.createDocumentFragment();
    var span;
    var spanGroup = [];
    for (var i = 0; i < text.length; i += 1) {
      // Create the span
      span = document.createElement('span');
      span.className = 'char char-' + context.spans.length;
      span.appendChild(document.createTextNode(text.charAt(i)));
      // Add it to the dom fragment
      wrapper.appendChild(span);
      // Add it to the span group
      spanGroup.push(span);
      // Add it to the span list
      context.spans.push(span);
    }
    context.spanGroups.push(spanGroup);
    return wrapper;
  }

  /**
   * Unwraps a span group
   * @param spanGroup
   */
  function unwrapSpanGroup(spanGroup){
    if(!spanGroup.length) {
      return;
    }
    var text = '';
    for(var i = 0; i < spanGroup.length; i++) {
      text += spanGroup[i].firstChild.nodeValue;
    }
    // Replace the span
    var textNode = document.createTextNode(text);
    spanGroup[0].parentNode.replaceChild(textNode, spanGroup[0]);
    // Remove spans
    for(var j = 1; j < spanGroup.length; j++) {
      spanGroup[j].parentNode.removeChild(spanGroup[j]);
    }
  }

  // Export
  return {
    isTextNode: isTextNode,
    wrap: wrap,
    unwrap: unwrap
  };

}());