module.exports = {
    trailingComma: "all",
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
    arrowParens: "always",
    overrides: [
        {
            files: ["**.json"],
            options: {
                tabWidth: 2
            }
        }
    ]
};