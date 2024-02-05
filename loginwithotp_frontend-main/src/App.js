import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Otp from './pages/Otp';
import Error from './pages/Error';
import Headers from './components/Headers';
import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/user/otp' element={<Otp />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [image, setImage] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [imagesFromBackend, setImagesFromBackend] = useState([]);

//   useEffect(() => {
//     fetchImagesFromBackend();
//   }, []); // Fetch images from backend when the component mounts

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('image', image);

//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log('Image uploaded successfully');
//       // Set the uploaded image URL in state
//       setUploadedImage(response.data.imageUrl);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   const fetchImagesFromBackend = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/images');
//       // Set the fetched images from the backend in state
//       setImagesFromBackend(response.data);
//     } catch (error) {
//       console.error('Error fetching images from backend:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Image Upload</h1>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       <button onClick={handleUpload}>Upload</button>
//       {uploadedImage && (
//         <div>
//           <h2>Uploaded Image</h2>
//           <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '50%', height: 'auto' }} />
//         </div>
//       )}
//       <h2>Images from Backend</h2>
//       <div>
//         {imagesFromBackend.map((imageUrl, index) => (
//           <img key={index} src={imageUrl} alt={`Image ${index}`} style={{ maxWidth: '50%', height: '50%' }} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;