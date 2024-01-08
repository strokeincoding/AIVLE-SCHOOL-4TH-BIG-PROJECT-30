import React, { useState, useRef } from "react";

function ImageUploadExample() {
  const [fileImage, setFileImage] = useState("");
  const fileInputRef = useRef(null);  

  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  return (
    <>
      <h3>Preview Image</h3>
      <table>
        <tbody>
          <tr>
            <th>Image</th>
            <td>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {fileImage && <img alt="Uploaded Sample" src={fileImage} style={{ margin: "auto", maxWidth: "100%", maxHeight: "300px" }} />}
                <input
                  ref={fileInputRef}  
                  name="imgUpload"
                  type="file"
                  accept="image/*"
                  onChange={saveFileImage}
                  style={{ margin: "10px 0" }}
                />
                {fileImage && (
                  <button
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "4px"
                    }}
                    onClick={deleteFileImage}
                  >
                    Delete
                  </button>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ImageUploadExample;
