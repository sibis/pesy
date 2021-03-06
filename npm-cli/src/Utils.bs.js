// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Char = require('bs-platform/lib/js/char.js');
var $$Array = require('bs-platform/lib/js/array.js');
var Curry = require('bs-platform/lib/js/curry.js');
var Printf = require('bs-platform/lib/js/printf.js');
var $$String = require('bs-platform/lib/js/string.js');
var Filename = require('bs-platform/lib/js/filename.js');
var Caml_string = require('bs-platform/lib/js/caml_string.js');
var Caml_chrome_debugger = require('bs-platform/lib/js/caml_chrome_debugger.js');

var Caml = {
  List: /* alias */ 0,
  $$String: /* alias */ 0,
};

var Path = {
  $slash: Filename.concat,
};

function kebab(str) {
  var charStrings = str.split('');
  var k = $$Array
    .map(function(c) {
      var c$1 = Caml_string.get(c, 0);
      if (c$1 === /* " " */ 32 || c$1 === /* "_" */ 95) {
        return $$String.make(1, /* "-" */ 45);
      } else if (
        Char.uppercase_ascii(c$1) !== Char.lowercase_ascii(c$1) &&
        Char.uppercase_ascii(c$1) === c$1
      ) {
        return '-' + $$String.make(1, Char.lowercase_ascii(c$1));
      } else {
        return $$String.make(1, c$1);
      }
    }, charStrings)
    .join('')
    .replace(/\-\-+/g, '-');
  if (k.split('')[0] === '-') {
    return $$String.sub(k, 1, (k.length - 1) | 0);
  } else {
    return k;
  }
}

function removeScope(kebab) {
  return kebab.replace(/[^\\/]*\//g, '');
}

function upperCamelCasify(kebab) {
  var parts = kebab.split('-');
  var k = $$Array.map($$String.capitalize_ascii, parts).join('');
  if (Caml_string.get(k, 0) === /* "-" */ 45) {
    return $$String.sub(k, 1, (k.length - 1) | 0);
  } else {
    return k;
  }
}

function renderAsciiTree(dir, name, namespace, $$require, isLast) {
  if (isLast) {
    return Curry._3(
      Printf.sprintf(
        /* Format */ Caml_chrome_debugger.simpleVariant('Format', [
          /* String_literal */ Caml_chrome_debugger.variant(
            'String_literal',
            11,
            [
              '\xe2\x94\x82\\n\xe2\x94\x94\xe2\x94\x80 ',
              /* String */ Caml_chrome_debugger.variant('String', 2, [
                /* No_padding */ 0,
                /* String_literal */ Caml_chrome_debugger.variant(
                  'String_literal',
                  11,
                  [
                    '\\n   ',
                    /* String */ Caml_chrome_debugger.variant('String', 2, [
                      /* No_padding */ 0,
                      /* String_literal */ Caml_chrome_debugger.variant(
                        'String_literal',
                        11,
                        [
                          '\\n   ',
                          /* String */ Caml_chrome_debugger.variant(
                            'String',
                            2,
                            [
                              /* No_padding */ 0,
                              /* String_literal */ Caml_chrome_debugger.variant(
                                'String_literal',
                                11,
                                ['\\n', /* End_of_format */ 0]
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]),
                  ]
                ),
              ]),
            ]
          ),
          '\xe2\x94\x82\\n\xe2\x94\x94\xe2\x94\x80 %s\\n   %s\\n   %s\\n',
        ])
      ),
      dir,
      name,
      namespace
    );
  } else {
    var match = $$require === '';
    return (
      Curry._3(
        Printf.sprintf(
          /* Format */ Caml_chrome_debugger.simpleVariant('Format', [
            /* String_literal */ Caml_chrome_debugger.variant(
              'String_literal',
              11,
              [
                '\xe2\x94\x82\\n\xe2\x94\x9c\xe2\x94\x80 ',
                /* String */ Caml_chrome_debugger.variant('String', 2, [
                  /* No_padding */ 0,
                  /* String_literal */ Caml_chrome_debugger.variant(
                    'String_literal',
                    11,
                    [
                      '\\n\xe2\x94\x82  ',
                      /* String */ Caml_chrome_debugger.variant('String', 2, [
                        /* No_padding */ 0,
                        /* String_literal */ Caml_chrome_debugger.variant(
                          'String_literal',
                          11,
                          [
                            '\\n\xe2\x94\x82  ',
                            /* String */ Caml_chrome_debugger.variant(
                              'String',
                              2,
                              [
                                /* No_padding */ 0,
                                /* String_literal */ Caml_chrome_debugger.variant(
                                  'String_literal',
                                  11,
                                  ['\\n', /* End_of_format */ 0]
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]),
                    ]
                  ),
                ]),
              ]
            ),
            '\xe2\x94\x82\\n\xe2\x94\x9c\xe2\x94\x80 %s\\n\xe2\x94\x82  %s\\n\xe2\x94\x82  %s\\n',
          ])
        ),
        dir,
        name,
        namespace
      ) + (match ? '' : (isLast ? '   ' : '\xe2\x94\x82  ') + $$require)
    );
  }
}

var spf = Printf.sprintf;

var parent = Filename.dirname;

exports.Caml = Caml;
exports.Path = Path;
exports.spf = spf;
exports.parent = parent;
exports.kebab = kebab;
exports.removeScope = removeScope;
exports.upperCamelCasify = upperCamelCasify;
exports.renderAsciiTree = renderAsciiTree;
/* No side effect */
