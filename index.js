import { execSync } from 'child_process';
import inquirer from 'inquirer';

const projects = [
  'AxiosCurrencyConverter',
  'ExpressMiddleware',
  'JestSuperTest',
  'MultiPageApp',
  'RequestAndResponse',
  'Sequelize',
  'SequelizeExpress',
  'SinglePageApp'
];

function installDependencies(project) {
  console.log(`\nInstalling dependencies for ${project}...`);
  execSync(`cd ${project} && npm install`, { stdio: 'inherit' });
  console.log(`Dependencies installed for ${project}.\n`);
}

function startProject(project) {
  console.log(`\nStarting ${project}...`);
  if (project === 'JestSuperTest') {
    execSync(`cd ${project} && npm test`, { stdio: 'inherit' });
  } else {
    execSync(`cd ${project} && npm start`, { stdio: 'inherit' });
  }
}

function showMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      message: 'Select a project to manage:',
      choices: [...projects, 'Exit']
    }
  ]).then(answers => {
    if (answers.project === 'Exit') {
      console.log('Exiting...');
      return;
    }

    inquirer.prompt([
      {
        type: 'confirm',
        name: 'install',
        message: `Do you want to install dependencies for ${answers.project}?`,
        default: false
      }
    ]).then(installAnswer => {
      if (installAnswer.install) {
        installDependencies(answers.project);
      }
      startProject(answers.project);
    });
  });
}

showMenu();