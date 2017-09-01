import test from 'ava'
import {text} from 'commonmark-helpers'
import getLinks from './index'

const article = `# title

this is [foo](https://foo.bar) and [bar](https://bar.baz)`

test('should get 2 links', t => {
  t.is(getLinks(article).length, 2)
})

test('should get text', t => {
  t.is(getLinks(article)[0].text, 'foo')
  t.is(getLinks(article)[1].text, 'bar')
})

test('should get href', t => {
  t.is(getLinks(article)[0].href, 'https://foo.bar')
  t.is(getLinks(article)[1].href, 'https://bar.baz')
})

test('should get html', t => {
  t.is(getLinks(article)[0].html, '<a href="https://foo.bar">foo</a>')
  t.is(getLinks(article)[1].html, '<a href="https://bar.baz">bar</a>')
})

test('should get no one links', t => {
  t.deepEqual(getLinks(''), [])
})

test('should get filtered links', t => {
  t.is(getLinks(article, n => text(n) === 'foo').length, 1)
})
