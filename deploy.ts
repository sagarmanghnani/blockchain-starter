import {ethers} from 'ethers';
import * as fs from 'fs-extra';
import {config} from 'dotenv';

config();

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(`${process.env.RPC_URL}`);
    const binary = fs.readFileSync('SimpleStorage_sol_SimpleStorage.bin', 'utf8');
    const abi = fs.readFileSync('SimpleStorage_sol_SimpleStorage.abi', 'utf8');
    const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);
    const contract = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying contract....");
    const deployedContract = await contract.deploy();
    let myCurrentFavoriteNumber = await deployedContract.retrieve();
    console.log("1st time myCurrentFavoriteNumber", myCurrentFavoriteNumber.toString());
    const txResponse = await deployedContract.store("7");
    const txReceipt = await txResponse.wait(1);
    myCurrentFavoriteNumber = await deployedContract.retrieve();
    console.log("2nd time myCurrentFavoriteNumber", myCurrentFavoriteNumber);
    // console.log("Here is the deployment transaction (transaction response)", deployedContract.deployTransaction);
    // const transactionReceipt = await deployedContract.deployTransaction.wait(1);
    // console.log("Above is the Transaction receipt", transactionReceipt);

    // since deployment is nothing but a transaction in which, data property of tx is the contract binary code, we can ourself
    // create the transaction and deploy the contract, without using contract.deploy() method


    // here in data property, we are putting the binary of the compiled contract, we want to deploy
    // const nonce = await wallet.getTransactionCount();
    // const tx = {
    //     gasPrice:20000000000,
    //     data: "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea264697066735822122065a885422b4c9054274fee08414262e9d3a040c8e658eab30fd390e507ac9e9064736f6c63430008110033",
    //     chainId:1337,
    //     nonce
    // }
    // const sendTransaction = wallet.sendTransaction(tx);
    // console.log(sendTransaction, "signed Transaction")
    
}

main();