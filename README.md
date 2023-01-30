## Pinata NFT Package

This package provides functionality to interact with the Pinata API and the Ethereum blockchain to upload NFTs.

## How to Use

Import the package
`import Pinata from "react-pinata"`
In your React component, use the "Pinata" component and pass in the following props:
`<Pinata
  pinataJWT={<your_pinata_JWT>}
  buttonClassNames={<your_button_class_names>}
  formComponent={<your_form_component>}
  pinataOptions={<your_pinata_options>}
  pinataMetaData={<your_pinata_meta_data>}
  nftDataJson={<your_nft_data_json>}
  inputStyle={<your_input_style>}
  inputClassNames={<your_input_class_names>}
  buttonStyle={<your_button_style>}
  NFTContractInteraction={<your_NFT_contract_interaction>}
  setMetaDataUrl={<your_set_metadata_url>}
  wrapperStyle={<your_wrapper_style>}
  setFileURL={<your_set_file_url>}
/>`

## Key Features

- Upload files and metadata to Pinata IPFS
- List NFTs on Ethereum blockchain
- Interact with NFT contract instance

## Technical Details

This package is built using React, axios and form-data. It uses axios to make API requests to Pinata API for uploading files and metadata to IPFS. The package also interacts with an NFT contract instance to list NFTs on the Ethereum blockchain.

## Usage

This package can be used by passing the following props:

- `pinataJWT` - JWT token for authentication with Pinata API
- `buttonClassNames` - class name for the List NFT button
- `formComponent` - a React component that will be included in the form
- `pinataOptions` - options for the file upload to Pinata IPFS
- `pinataMetaData` - metadata for the file upload to Pinata IPFS
- `nftDataJson` - metadata in JSON format for the NFT
- `inputStyle` - style for the file input
- `inputClassNames` - class name for the file input
- `buttonStyle` - style for the List NFT button
- `NFTContractInteraction` - function to interact with the NFT contract instance
- `setMetaDataUrl` - function to set the metadata URL
- `wrapperStyle` - style for the wrapper component
- `setFileURL` - function to set the file URL

## Note

Please make sure to have the required dependencies installed.
