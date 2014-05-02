# charwrapper.js

A lightweight helper which wraps and unwraps nested chars with spans in vanilla javascript.

Input
```
    <table>
      <tr id="demo">
        <td>Hey</td>
        <td>how</td>
        <td>are</td>
        <td>
          <span>you</span><strong>?</strong>
        </td>
      </tr>
    </table>
```

Wrapping
```
charwrapper.wrap(document.getElementById('demo'));
```

Output
```
  <table>
    <tbody><tr>
      <td><span class="char char-1">H</span><span class="char char-2">e</span><span class="char char-3">y</span></td>
      <td><span class="char char-4">h</span><span class="char char-5">o</span><span class="char char-6">w</span></td>
      <td><span class="char char-7">a</span><span class="char char-8">r</span><span class="char char-9">e</span></td>
      <td>
        <span><span class="char char-10">y</span><span class="char char-11">o</span><span class="char char-12">u</span></span><strong><span class="char char-13">?</span></strong>
      </td>
    </tr>
  </tbody></table>
```

Unwrapping
```
charwrapper.wrap(document.getElementById('demo'));
charwrapper.unwrap(document.getElementById('demo'));
```

```
    <table>
      <tr id="demo">
        <td>Hey</td>
        <td>how</td>
        <td>are</td>
        <td>
          <span>you</span><strong>?</strong>
        </td>
      </tr>
    </table>
```

See the [demo](demo.html)