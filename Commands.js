var fs = require('fs');
var mkdirp = require('mkdirp');

class Commands {
    constructor(program) {
        this.program = program;
        this.configFile = JSON.parse(fs.readFileSync("./rcli-config.json").toString());
    }

    create() {
        const { componentPath, stylePath, styleExt } = this.configFile;

        let ReactTemplate = `import React, { Component } from 'react';\n\nexport default class ${this.program.create} extends Component {\n\tconstructor(props) {\n\t\tsuper(props);\n\t}\n\n\trender() {\n\t\treturn (\n\t\t\t<div>\n\t\t\t<h1>Hello world !</h1>\n\t\t\t</div>\n\t\t);\n\t}\n}`;
        let ReactTestTemplate = `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport ${this.program.create} from './${this.program.create}';\n\nit('renders without crashing', () => {\nconst div = document.createElement('div');\nReactDOM.render(<${this.program.create} />, div);\nReactDOM.unmountComponentAtNode(div);\n});`;

        mkdirp(`./src/${componentPath}/${this.program.create}`, (e) => {
            if (e) throw new Error(e);
        });

        setTimeout(() => {
            // Write the Template of a react component
            fs.writeFileSync(`${componentPath}/${this.program.create}/${this.program.create}.jsx`, ReactTemplate);

            // Write styles clauses (make a difference with CSS and SASS or SCSS files)
            if (style.ext === "sass" || style.ext === "scss") {
                fs.appendFileSync(`${stylePath}_imports.${styleExt}`, `@import '${componentPath}/${this.program.create}/_${this.program.create}.${style.ext}';\n`);
                fs.writeFileSync(`${componentPath}/${this.program.create}/_${this.program.create}.${styleExt}`, '');
            } else {
                fs.writeFileSync(`${componentPath}/${this.program.create}/${this.program.create}.css`, '');
            }

            // Write template for tests
            fs.writeFileSync(`${componentPath}/${this.program.create}/${this.program.create}.test.js`, ReactTestTemplate);
        }, 1000);
    }

    config() {
        const args = this.program.config.split(',');
        // Parser le config.json
        const configFile = this.configFile;
        
        args.forEach(arg => {
            const keyVal = arg.split('='); // Récupération de la valeur

            // Modifier la valeur à la clée correspondante
            let key = keyVal[0];
            const value = keyVal[1];
            configFile[key] = value;
        });

        // Réécrire le fichier de config
        fs.writeFileSync('./rcli-config.json', JSON.stringify(configFile));
    }
}
module.exports = Commands;