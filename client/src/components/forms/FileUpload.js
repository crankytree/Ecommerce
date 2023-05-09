import { Avatar, Badge, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";

const FileUpload = (props) => {
  const { values, setValues, loading, setLoading } = props;
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);

    const files = e.target.files;
    // console.log(files);

    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/upload-images`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("Image Upload", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("Image Upload Error", err);
              });
          },
          "base64"
        );
      }
      console.log(allUploadedFiles);
    }
  };

  const removeImageHandler = async (public_id) => {
    setLoading(true);

    axios
      .post(
        `${process.env.REACT_APP_API}/remove-images`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;

        let filteredImages = images.filter((image) => image.public_id !== public_id);
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="">
        {values.images?.length > 0 && (
          <Space size={30} className="mb-4">
            {values.images.map((image) => (
              <Badge
                key={image.public_id}
                count="x"
                style={{ cursor: "pointer" }}
                onClick={() => removeImageHandler(image.public_id)}
              >
                <Avatar src={image.url} shape="square" size={100} />
              </Badge>
            ))}
            </Space>
          )}
          {loading && (
            
              <LoadingOutlined style={{fontSize: "2rem" , marginLeft: "2.1rem"}}  />
            
          )}
      </div>

      <div className="">
        <label className="btn btn-primary">
          Choose File
          <input type="file" multiple hidden accept="images/*" onChange={fileUploadAndResize} />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
