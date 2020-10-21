const fs = require('fs');

const copyApiToolkit = () => {
    // Copy .module.js --> .mjs for Node 13 compat.
    fs.writeFileSync(
        `${process.cwd()}/dist/apiToolkit.mjs`,
        fs.readFileSync(`${process.cwd()}/dist/apiToolkit.module.js`),
    );
};

copyApiToolkit();
