import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { registerfunction } from "../services/Apis";
import { useNavigate } from "react-router-dom"
import "../styles/mix.css";
import { useEffect } from 'react';
import axios from 'axios';

const Register = () => {

  const [passhow, setPassShow] = useState(false);

  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();


  // setinputvalue
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value })
  }


  // register data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password } = inputdata;

    if (fname === "") {
      toast.error("Enter Your Name")
    } else if (email === "") {
      toast.error("Enter Your Email")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email")
    } else if (password === "") {
      toast.error("Enter Your Password")
    } else if (password.length < 6) {
      toast.error("password length minimum 6 character")
    } else {
      const response = await registerfunction(inputdata);

      if (response.status === 200) {
        setInputdata({ ...inputdata, fname: "", email: "", password: "" });
        navigate("/")
      } else {
        toast.error(response.response.data.error);
      }
    }
  }



  //------------image
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagesFromBackend, setImagesFromBackend] = useState([]);

  useEffect(() => {
    fetchImagesFromBackend();
  }, []); // Fetch images from backend when the component mounts

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image uploaded successfully');
      // Set the uploaded image URL in state
      setUploadedImage(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const fetchImagesFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:5000/images');
      // Set the fetched images from the backend in state
      setImagesFromBackend(response.data);
    } catch (error) {
      console.error('Error fetching images from backend:', error);
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>We are glad that you will be using Project to manage
              your tasks! We hope that you will get like it.</p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input type="text" name="fname" id="" onChange={handleChange} placeholder='Enter Your Name' />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="" onChange={handleChange} placeholder='Enter Your Email Address' />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className='two'>
                <input type={!passhow ? "password" : "text"} name="password" id="" onChange={handleChange} placeholder='Enter Your password' />
                <div className='showpass' onClick={() => setPassShow(!passhow)} >
                  {!passhow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className='btn' onClick={handleSubmit}>Sign Up</button>
            <p>Don't have and account </p>
          </form>
        </div>
        <ToastContainer />



        <div>
          <h1>Image Upload</h1>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleUpload}>Upload</button>
          {uploadedImage && (
            <div>
              <h2>Uploaded Image</h2>
              <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '50%', height: 'auto' }} />
            </div>
          )}
          <h2>Images from Backend</h2>
          <div>
            {imagesFromBackend.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Image ${index}`} style={{ maxWidth: '50%', height: '50%' }} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Register;