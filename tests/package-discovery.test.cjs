const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const packageJson = require('../package.json');

test('package discovery points at built node and credential files', () => {
  assert.equal(packageJson.n8n.n8nNodesApiVersion, 1);
  for (const entry of [...packageJson.n8n.nodes, ...packageJson.n8n.credentials]) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', entry)), `${entry} exists after build`);
  }
  assert.ok(packageJson.files.includes('dist'));
  assert.ok(fs.existsSync(path.join(__dirname, '..', packageJson.main)));
  assert.ok(packageJson.files.includes(packageJson.main));
  assert.equal(packageJson.devDependencies['n8n-workflow'], '3.0.1');
  assert.equal(packageJson.devDependencies['n8n-core'], undefined);
});

test('ships only Base discovery entries and no runtime dependencies', () => {
  assert.deepEqual(packageJson.dependencies ?? {}, {});
  assert.deepEqual(packageJson.peerDependencies ?? {}, {});
  assert.equal(packageJson.name, '@emems/n8n-nodes-base-com');
  assert.deepEqual(packageJson.n8n.nodes, ['dist/nodes/Base/Base.node.js']);
  assert.deepEqual(packageJson.n8n.credentials, ['dist/credentials/BaseComApi.credentials.js']);
  const { Base, BaseComApi } = require('../index.js');
  assert.equal(new Base().description.name, 'base');
  assert.equal(new Base().description.displayName, 'Base');
  assert.equal(new Base().description.description, 'Consume the Base (formerly BaseLinker) API');
  const credential = new BaseComApi();
  assert.equal(credential.name, 'baseComApi');
  assert.equal(credential.authenticate.properties.headers['X-BLToken'], '={{$credentials.apiKey}}');
  assert.ok(fs.existsSync(path.join(__dirname, '../dist/nodes/Base/base.svg')));
  assert.equal(fs.existsSync(path.join(__dirname, '../dist/nodes/FriendGrid')), false);
  assert.equal(fs.existsSync(path.join(__dirname, '../dist/credentials/BaselinkerApi.credentials.js')), false);
});
