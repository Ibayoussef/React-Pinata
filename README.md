# Pianata

Pianata is a component that allows you to interact with the IPFS network via the Pinata API. It allows you to upload files and JSON data to IPFS, and interact with the Ethereum blockchain using the ethers library.

## Installation

In order to use Pianata, you'll need to install it first. Here's an example of how to install it using npm:

Copy code

`npm install react-pinata`

You'll also need to install the following dependencies:

cssCopy code

`npm install axios
npm install form-data
npm install ethers`

## Usage

To use Pianata, you'll need to import it in your code:

pythonCopy code

`import { Pianata } from 'pianata';`

Then, you can use it like this:

cssCopy code

`<Pianata
  pinataKey={YOUR_PINATA_API_KEY}
  pinataSecret={YOUR_PINATA_SECRET_API_KEY}
  buttonClassNames={'custom-button-class'}
  formComponent={<YourFormComponent />}
  pinataOptions={{cidVersion: 0}}
  pinataMetaData={{keywords: "nft,eth,crypto"}}
  nftDataJson={{name: 'My NFT', symbol: 'MNF'}}
  inputStyle={{color: 'blue'}}
  inputClassNames={'custom-input-class'}
  buttonStyle={{backgroundColor: 'green'}}
  NFTContractInteraction={() => {
    //Your contract interaction code here
  }}
/>`

Props

1.  `pinataKey` (string): Your Pinata API key

2.  `pinataSecret` (string): Your Pinata Secret API key

3.  The `formComponent` prop should be a JSX element that represents the form that you want to display for the user to interact with.

4.  The `pinataOptions` prop is an object that represents the options for pinning the file to the IPFS network.

5.  The `pinataMetaData` prop is an object that represents the metadata for the file you want to upload to IPFS.

6.  The `nftDataJson` prop is the JSON data that represents the metadata for the NFT you want to create.

7.  The `inputStyle` prop is an object that represents the style for the file input element.

8.  The `inputClassNames` prop is a string that represents the class name for the file input element.

9.  The `buttonStyle` prop is an object that represents the style for the "List NFT" button.

10. The `buttonClassNames` prop is a string that represents the class name for the "List NFT" button.

11. The `NFTContractInteraction` prop is a function that will be called when the "List NFT" button is clicked. This function should handle the logic for interacting with the NFT contract on the Ethereum network.

The component will automatically handle uploading files and JSON data to IPFS, and interacting with the Ethereum blockchain.

## Additional functionality

You can also use the following functions independently

- `uploadFileToIPFS` : Async function to upload file to IPFS
- `uploadMetadataToIPFS`: Async function to upload metadata to IPFS

Note that you must provide your own code to interact with the Ethereum blockchain. You'll need to use the ethers library to do this, and you'll need to provide your own contract ABI and contract address.

## Conclusion

Pianata is an easy-to-use component that allows you to interact with the IPFS network and the Ethereum blockchain. With it, you can easily upload files and JSON data to IPFS, and interact with your Ethereum contract to mint, transfer, and manage your NFTs.
