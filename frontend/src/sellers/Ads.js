import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import NavbarSeller from './NavBarSeller';
import { useNavigate } from 'react-router-dom';

const Ads = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const { user } = useContext(UserContext);
  const [formValues, setFormValues] = useState({
    user_id: '', 
    title: '',
    description: '',
    street: '',
    city: '',
    area: '',
    state: '',
    price: '',
    bed_count: '',
    room_count: '',
    home_type: 'Apartment', 
    type: 'rent',
    amenities: [],
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (user && user?.user?.id) {
      setFormValues(prevValues => ({ ...prevValues, user_id: user?.user?.id }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormValues((prevState) => ({
        ...prevState,
        amenities: [...prevState.amenities, name],
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        amenities: prevState.amenities.filter((amenity) => amenity !== name),
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);

    for (let key in formValues) {
      if (Array.isArray(formValues[key])) {
        formData.append(key, JSON.stringify(formValues[key]));
      } else {
        formData.append(key, formValues[key]);
      }
    }

    try {
      await axios.post('https://full-stack-virid.vercel.app/add-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate(`/ads`);
      
    } catch (error) {
      console.error('Error saving ad:', error);
    }
  };

  return (
    <>
      <NavbarSeller />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <h2 className="text-3xl font-bold my-6">Having a new home for rent?</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg" onSubmit={handleSave}>
          <h3 className="text-xl font-bold mb-4">Post New AD</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., 2BHK Villa"
              value={formValues.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Description of your property"
              value={formValues.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex mb-4">
            <div className="mr-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    value="Rent"
                    name="type"
                    checked={formValues.type === 'Rent'}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="ml-2">Rent</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    value="Lease"
                    name="type"
                    checked={formValues.type === 'Lease'}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="ml-2">Lease</span>
                </label>
              </div>
            </div>
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input
                type="text"
                name="price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="1200"
                value={formValues.price}
                onChange={handleInputChange}
                required
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/3 pr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Home Type</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="home_type"
                value={formValues.home_type}
                onChange={handleInputChange}
              >
                <option value="Apartment">Apartment</option>
                <option value="Individual Villa">Individual Villa</option>
                <option value="Shared Room">Shared Room</option>
                <option value="Colony">Colony</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="w-1/3 px-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">No. of Bedrooms</label>
              <input
                type="number"
                name="bed_count"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="0"
                value={formValues.bed_count}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-1/3 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">No. of Rooms</label>
              <input
                type="number"
                name="room_count"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="0"
                value={formValues.room_count}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Street</label>
              <input
                type="text"
                name="street"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Street"
                value={formValues.street}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Area</label>
              <input
                type="text"
                name="area"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Area"
                value={formValues.area}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
              <input
                type="text"
                name="city"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Bengaluru"
                value={formValues.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
              <input
                type="text"
                name="state"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., Karnataka"
                value={formValues.state}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Amenities</label>
            <div className="flex flex-wrap">
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id="water"
                  name="Water"
                  checked={formValues.amenities.includes('Water')}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2">Water</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id="ac"
                  name="AC"
                  checked={formValues.amenities.includes('AC')}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2">AC</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id="furnished"
                  name="Furnished"
                  checked={formValues.amenities.includes('Furnished')}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2">Furnished</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id="lift"
                  name="Lift"
                  checked={formValues.amenities.includes('Lift')}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2">Lift</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id="hospital"
                  name="Hospital"
                  checked={formValues.amenities.includes('Hospital')}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2">Hospital</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Images</label>
            <div>
              <p className="text-sm text-gray-600 mb-2">(* Choose image less than 10kb)</p>
              <input type="file" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Ads;
