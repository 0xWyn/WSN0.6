import {uploadToCloudinary} from "../../../utils/uploadToCloud.js"

export const useMessage = () => {
  
  const sendMessage = async (message) => {
    const media = await uploadToCloudinary(message.media, {folder: "messages"});
    const package = {
      text: message.text,
      media,
    };
    const {data} = await API.post("/messages", package);
  }
  
  return {sendMessage};
}