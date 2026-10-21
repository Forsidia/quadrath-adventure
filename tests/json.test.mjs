import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const source = await readFile(new URL('../src/viewer/JsonCode.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2022 } }).outputText;
const output = {};
new Function('React', 'exports', compiled)(React, output);

test('JSON highlighting distinguishes keys, values, numbers, and literals safely', () => {
  const value = { name: '<script>alert(1)</script>', bonus: 2, active: true, extra: null };
  const markup = renderToStaticMarkup(React.createElement(output.JsonCode, { value }));
  for (const token of ['json-key', 'json-string', 'json-number', 'json-literal']) assert(markup.includes(token));
  assert(!markup.includes('<script>'));
  assert(markup.includes('&lt;script&gt;'));
  assert(markup.includes('alert(1)'));
});
