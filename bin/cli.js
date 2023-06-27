#! /usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const colors = require('../lib/colors');
const packageJSON = require('../starter/package.json');
const CWD = process.cwd();
const slash = path.join('/');
let dirname = path.join(__dirname).split(slash);
dirname.pop();
dirname = dirname.join(slash);
const arg = process.argv.slice(2);
if (arg.length != 1) {
    console.log(`${colors.text('Command not found').redBG().whiteColor().bold().get()}`);
    console.log(`${colors.text('Please use ').whiteColor().bold().get()} ${colors.text(`npx create-bee-project <project-name>`).cyanColor().bold().get()}`);
    process.exit(1);
}

function copyDirectory(old_dir, new_dir, callback) {
    fs.mkdir(new_dir, function (err) {
        if (err) throw err;
        fs.readdir(old_dir, 'utf8', function (err, contents) {
            if (err) throw err;
            let i = -1;
            const copyCallback = function () {
                i++;
                if (i < contents.length) {
                    copy(path.join(old_dir, '/', contents[i]), path.join(new_dir, '/', contents[i]), copyCallback);
                } else {
                    callback();
                }
            };
            copyCallback();
        })
    })
}
function copy(old_dir, new_dir, callback) {
    fs.readFile(old_dir, function (err,content) {
        if (err) {
            copyDirectory(old_dir, new_dir, callback);
            return;
        }
        fs.writeFile(new_dir, content, function (err) {
            if (err) throw err;
            callback();
        })
    })
}
const getSpace = (space) => {
    let s = '';
    while (space > 0) {
        s += ' ';
        space--;
    }
    return s;
}
let env_ready = false;
const BeeLoader = (space) => {
    process.stdout.moveCursor(0, -1)
    process.stdout.clearLine(1);//🐝 \u1F41D
    console.log(`${getSpace(space)}🐝`);
    if (space > 0) {
        setTimeout(() => {
            BeeLoader(--space);
        }, 60);
    } else {
        if (!env_ready) {
            BeeLoader(30);
        } else {
            const shiftToCenter = getSpace(24)
            process.stdout.moveCursor(0, -1)
            process.stdout.clearLine(1);//🐝
            console.log(`${colors.text('✔  ').greenColor().bold().get()}${colors.text(`Successful`).bold().get()}`);
            console.log(`${colors.text('>> ').bold().yellowColor().get()}${colors.text('Installing dependencies...').bold().blueColor().get()}`)
            execSync(`cd ${projectName} && npm install && git init`, { stdio: 'inherit' });
            console.log(`\n\t\t${shiftToCenter}${colors.text(`🐝  Welcome Genius!  🐝`).greenColor().bold().get()}\n`);
            console.log(`\n${colors.text(`${shiftToCenter}Your project is ready. Get yourself busy and produce some honey.`).whiteColor().get()}`);
            console.log(`\n\t\t\t\t${shiftToCenter}${colors.text(`Happy coding!`).yellowColor().bold().get()}`);
            console.log(`\n\n\n${colors.text('>> ').bold().yellowColor().get()}${colors.text('Change to project directory:').whiteColor().bold().get()} ${colors.text(`cd ${projectName}`).cyanColor().get()}`);
            console.log(`${colors.text('>> ').bold().yellowColor().get()}${colors.text('Start dev server:').whiteColor().bold().get()} ${colors.text(`npm start`).cyanColor().get()}`);
            
            process.exit(0);
        }
        
    }
}
const projectName = arg[0];
const projectDir = path.join(CWD, `/${projectName}`);
packageJSON.name = projectName.toLowerCase();
fs.writeFileSync(path.join(dirname, '/starter/package.json'), JSON.stringify(packageJSON, undefined, 2));
console.log(`${colors.text('>> ').bold().yellowColor().get()}${colors.text(' Setting up development environment').bold().blueColor().get()}`)
console.log('...');
BeeLoader(30);
copyDirectory(path.join(dirname, '/starter'), projectDir, function () {
    fs.writeFile(path.join(projectDir, '/.gitignore'), 'node_modules', (err) => {
        if (err) { }
        env_ready = true;
    })
});