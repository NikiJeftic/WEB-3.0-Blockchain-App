
//ABI- Contract Aplication Binary Interface-standard way to interact with contract in etherium eco system
//ABI was added to Transaction.json after npx hardhat run .\scripts\deploy.js --network ropsten
import abi from './Transactions.json';
export const contractABI=abi.abi;
//Address copied from terminal after succesful npx hardhat run .\scripts\deploy.js --network ropsten
export const contractAddress='0x869A442E942b18c422ca841690a3eC182c86a392'; 