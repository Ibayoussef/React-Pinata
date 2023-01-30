import axios from "axios";

const FormData = require("form-data");
const React = require("react");
const Pinata = ({
  pinataJWT,

  buttonClassNames,
  formComponent,
  pinataOptions,
  pinataMetaData,
  nftDataJson,
  inputStyle,
  inputClassNames,
  buttonStyle,
  NFTContractInteraction,
  setMetaDataUrl,
  wrapperStyle,
  setFileURL,
}) => {
  const uploadFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️

    let data = new FormData();
    data.append("file", file);
    data.append("pinataMetadata", pinataMetaData);
    data.append("pinataOptions", pinataOptions);
    let result;
    await axios
      .post(url, data, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          Authorization: "Bearer " + pinataJWT,
        },
      })
      .then(function (response) {
        console.log("image uploaded", response.data.IpfsHash);
        result = {
          success: true,
          pinataURL:
            "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
        };
      })
      .catch(function (error) {
        console.log(error);
        console.log({
          success: false,
          message: error.message,
        });
      });
    return result;
  };
  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS(nftDataJson) {
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
  const content = /*#__PURE__*/ React.createElement(
    "div",
    {
      style: wrapperStyle,
    },
    formComponent,
    /*#__PURE__*/ React.createElement("input", {
      type: "file",
      style: inputStyle,
      className: inputClassNames,
      onChange: OnChangeFile,
    }),
    /*#__PURE__*/ React.createElement(
      "button",
      {
        onClick: listNFT,
        style: buttonStyle,
        className: buttonClassNames,
      },
      "List NFT"
    )
  );
  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS(nftDataJson);
      setMetaDataUrl(metadataURL);
      //Pull the deployed contract instance
      await NFTContractInteraction();
    } catch (e) {
      alert("Upload error" + e);
    }
  }
  const uploadJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    let result;
    await axios
      .post(url, JSONBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + pinataJWT,
        },
      })
      .then(function (response) {
        result = {
          success: true,
          pinataURL:
            "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
        };
      })
      .catch(function (error) {
        console.log(error);
        console.log({
          success: false,
          message: error.message,
        });
      });
    return result;
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
export default Pinata;
