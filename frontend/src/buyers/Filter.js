import { Button, Form, InputNumber, Select } from 'antd';
import axios from 'axios';
import { SearchOutlined,ClearOutlined } from '@ant-design/icons';
import { Pagination, Spin  } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import CardDetails from '../home/CardDetails';
import { UserContext } from '../UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Option } = Select;


const Filter = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [allAds, setAllAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [areas, setAreas] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllAds();
  }, []);

  const getAllAds = async () => {
    try {
      const response = await axios.get(`https://full-stack-virid.vercel.app/ads`);
      const adsWithImages = response.data.map(ad => {
        if (ad.image) {
          const base64Image = btoa(
            new Uint8Array(ad.image.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          return {
            ...ad,
            imageSrc: `data:image/jpeg;base64,${base64Image}`
          };
        }
        return ad;
      });
    setLoading(false);
      
      setAllAds(adsWithImages);
      setFilteredAds(adsWithImages); // Initially display all ads
      setTotalItems(response.data.length);
      generateAreaList(response.data);
    } catch (error) {
    }
  };

  const generateAreaList = (data) => {
    const areasList = data.map(apartment => apartment.city);
    const uniqueAreas = [...new Set(areasList)];
    setAreas(uniqueAreas);
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleClearFilters = () => {
  form.resetFields(); // Reset form fields
  getAllAds(); // Reset ads list
};

  const handleFilterChanges = (values) => {
    form.validateFields()
      .then(validatedValues => {
        axios.post('https://full-stack-virid.vercel.app/filter', validatedValues)
          .then(response => {
            const adsWithImages = response.data.map(ad => {
              if (ad.image) {
                const base64Image = btoa(
                  new Uint8Array(ad.image.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                return {
                  ...ad,
                  imageSrc: `data:image/jpeg;base64,${base64Image}`
                };
              }
              return ad;
            });
            
            setFilteredAds(adsWithImages); // Update filtered ads
            setTotalItems(response.data.length);
          })
          .catch(error => {
            toast.error("Error:Please Reload ")
          });
      })
      .catch(info => {
      });
  };

  return (
    <div>
      <h3 className='center-align'>Search Your Home with us!</h3>
      <Form form={form} layout="horizontal" onFinish={handleFilterChanges}>
        <div className='row mainarea'>
          <div className='col-md-2'>
            <Form.Item name="area" label="Area">
              <Select placeholder="Select ">
                <Option value="">All</Option>
                {areas.map((area, index) => (
                  <Option key={index} value={area}>{area}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className='col-md-2'>
            <Form.Item name="type_of_home" label="Select">
              <Select placeholder="Select ">
                <Option value="Apartment">Apartment</Option>
                <Option value="Individual">Individual Villa</Option>
                <Option value="Colony">Colony</Option>
                <Option value="Other">Others</Option>
              </Select>
            </Form.Item>
          </div>
          <div className='col-md-2'>
            <Form.Item name="type" label="Type">
              <Select placeholder="Select type">
                <Option value="Rent">Rent</Option>
                <Option value="Lease">Lease</Option>
              </Select>
            </Form.Item>
          </div>
          <div className='col-md-2'>
            <Form.Item label="Min" name="min">
              <InputNumber min={0} />
            </Form.Item>
          </div>
          <div className='col-md-2'>
            <Form.Item label="Max" name="max">
              <InputNumber min={0} />
            </Form.Item>
          </div>
          <div className='col-md-2'>
            <Form.Item>
              <Button  shape='circle' icon={<SearchOutlined />} htmlType="submit" />
              <Button className='ml-3' icon={<ClearOutlined />} onClick={handleClearFilters} >Clear</Button>

            </Form.Item>
          </div>
        </div>
      </Form>
      {loading ? (
        <div className='center-align-mt0 mb-5'>
  <Spin className='mb-5' size="large"><p className='mt-6'>Please wait..</p></Spin>
  </div>
) : (
      <div className='ad-area row mb-5'>
      
        <div><p className='m-3'>Results</p></div>
        
        {filteredAds.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((note) => (
          <div className='center-align-mt1 col-md-3 mb-5' key={note.id}>
            <CardDetails data={note} />
          </div>
        ))}
        <Pagination
          className='page center-align-mt0'
          total={totalItems}
          showTotal={(total) => `Total ${total} items`}
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePageChange}
        />
      </div>
    )}
    </div>
    
  );
  
};

export default Filter;
