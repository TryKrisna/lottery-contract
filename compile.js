const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(inboxPath, 'utf8');
 
const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'evm.bytecode'],
        },
        },
    },
};


compilesFiles = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log("========>",compilesFiles.contracts);
const jsonString = JSON.stringify(compilesFiles, null, 2);
fs.writeFile('data.json', jsonString, (err) => {
  if (err) {
    console.error('Error writing file', err);
  } else {
    console.log('Successfully wrote file');
  }
});
const contractName = 'Lottery'; // Replace with your actual contract name
const compiledContract = compilesFiles.contracts['Lottery.sol'][contractName];
const interface = compiledContract.abi;
const bytecode = compiledContract.evm.bytecode.object;

const result = {
    interface: interface,
    bytecode: bytecode
};
module.exports= result