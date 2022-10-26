import {ethers} from 'ethers';
import * as fs from 'fs-extra';

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
    const binary = fs.readFileSync('./SimpleStorage_sol_Name.bin', 'utf8');
    const abi = fs.readFileSync('./SimpleStorage_sol_Name.abi', 'utf8');
    const wallet = new ethers.Wallet('1de91bb4057d93212e77616118d01447a09130fb8d0ed927cbb6fdcc1f7601aa', provider);
    const contract = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying contract....");
    const deployedContract = await contract.deploy();
    console.log("Contract Deployed....", deployedContract);
}

main();