// As the test suite doesn't work with native ESM, there's a risk of forgetting
// to reenable it after running the suite. This as a prepublish should help ensure
// everything stays correct.

import fs from 'fs';
import path from 'path';

const moduleType = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8')).type;

if (!moduleType) throw('Set module type');
