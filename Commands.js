var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

let config = require('./config.json');
let componentPath = config.path;
let style = config.style;

class Commands {
    constructor(program) {
        this.program = program;
    }

    create() {
        let ReactTemplate = `import React, { Component } from 'react';\n\nexport default class ${this.program.create} extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t}\n\n\trender() {\n\t\treturn (\n\t\t\t<div>\n\t\t\t<h1>Hello world !</h1>\n\t\t\t</div>\n\t\t);\n\t}\n}`;
        let ReactTestTemplate = `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport ${this.program.create} from './${this.program.create}';\n\nit('renders without crashing', () => {\nconst div = document.createElement('div');\nReactDOM.render(<${this.program.create} />, div);\nReactDOM.unmountComponentAtNode(div);\n});`;

        mkdirp(`./src/${componentPath}/${this.program.create}`, (e) => {
            if (e) throw new Error(e);
        });

        setTimeout(() => {
            // Write the Template of a react component
            fs.writeFileSync(`./src/${componentPath}/${this.program.create}/${this.program.create}.jsx`, ReactTemplate);

            // Write styles clauses (make a difference with CSS and SASS or SCSS files)
            if (style.ext === "sass" || style.ext === "scss") {
                fs.appendFileSync(`src/${style.path}_imports.${style.ext}`, `@import './src/${componentPath}/${this.program.create}/_${this.program.create}.${style.ext}';\n`);
                fs.writeFileSync(`src/${componentPath}/${this.program.create}/_${this.program.create}.${style.ext}`, '');
            } else {
                fs.writeFileSync(`src/${componentPath}/${this.program.create}/${this.program.create}.css`, '');
            }

            // Write template for tests
            fs.writeFileSync(`./src/${componentPath}/${this.program.create}/${this.program.create}.test.js`, ReactTestTemplate);
        }, 1000);
    }
}
module.exports = Commands;