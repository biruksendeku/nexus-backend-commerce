const assert = require('node:assert/strict');
const { describe, it } = require('mocha');
const { formatName, getFirstName } = require('../utils/string/formatName');

describe('name formatting', () => {
  it('capitalizes each name and normalizes whitespace', () => {
    assert.equal(formatName('  jOhN   mICHAEL doe '), 'John Michael Doe');
  });

  it('returns an empty string for blank names', () => {
    assert.equal(formatName('   '), '');
    assert.equal(getFirstName('   '), '');
  });

  it('returns the formatted first name', () => {
    assert.equal(getFirstName('jOhN mICHAEL doe'), 'John');
  });
});
