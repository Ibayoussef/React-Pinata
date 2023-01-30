const axios = require("axios");
const FormData = require("form-data");
const ethers = require("ethers");
const React = require("react");
require("@babel/core").transformSync(Pinata, {
  plugins: ["@babel/plugin-syntax-jsx"]
});
const Pinata = ({
  pinataKey,
  pinataSecret,
  buttonClassNames,
  formComponent,
  pinataOptions,
  pinataMetaData,
  nftDataJson,
  inputStyle,
  inputClassNames,
  buttonStyle,
  NFTContractInteraction,
  updateMessage,
  wrapperStyle
}) => {
  const uploadFileToIPFS = async file => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️

    let data = new FormData();
    data.append("file", file);
    data.append("pinataMetadata", pinataMetaData);
    data.append("pinataOptions", pinataOptions);
    return axios.post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataKey,
        pinata_secret_api_key: pinataSecret
      }
    }).then(function (response) {
      console.log("image uploaded", response.data.IpfsHash);
      return {
        success: true,
        pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      };
    }).catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message
      };
    });
  };
  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftDataJson);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }
  const content = /*#__PURE__*/React.createElement("div", {
    style: wrapperStyle
  }, formComponent, /*#__PURE__*/React.createElement("input", {
    type: "file",
    style: inputStyle,
    className: inputClassNames,
    onChange: OnChangeFile
  }), /*#__PURE__*/React.createElement("button", {
    onClick: listNFT,
    style: buttonStyle,
    className: buttonClassNames
  }, "List NFT"));
  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      updateMessage("Please wait.. uploading (upto 5 mins)");

      //Pull the deployed contract instance
      NFTContractInteraction(metadataURL, signer);
    } catch (e) {
      alert("Upload error" + e);
    }
  }
  const uploadJSONToIPFS = async JSONBody => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios.post(url, JSONBody, {
      headers: {
        pinata_api_key: pinataKey,
        pinata_secret_api_key: pinataSecret
      }
    }).then(function (response) {
      return {
        success: true,
        pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      };
    }).catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message
      };
    });
  };
  async function OnChangeFile(e) {
    let file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }
  return content;
};
module.exports = Pinata;