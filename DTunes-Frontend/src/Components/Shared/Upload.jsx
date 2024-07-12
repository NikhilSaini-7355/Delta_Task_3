import { openUploadWidget } from "../../utils/CloudinaryService";
import { Cloudinary_Upload_Preset } from "../../config";

const CloudinaryUpload = ({setUrl,setUploadedFileName,uploadedfilename}) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "djkokji1j",
        uploadPreset: Cloudinary_Upload_Preset,
        sources: ["local", "url"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
         // props.onImageUpload(result.info.public_id);
         setUrl(result.info.secure_url);
         setUploadedFileName(result.info.original_filename);
        }
        else {
          console.log(error);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="bg-white text-black font-semibold rounded-full px-10 py-3" onClick={uploadImageWidget}>
      {uploadedfilename.substring(0,35)}
    </button>
  );
};

export default CloudinaryUpload;
