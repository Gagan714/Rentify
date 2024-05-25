import React, { useContext, useState } from 'react'
import { EditOutlined, DeleteOutlined,EyeOutlined } from '@ant-design/icons';
import {Button, Card, Modal, Form, Input, Radio, Select  } from 'antd';
import axios from 'axios';
import noImg from '../images/no_img.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../UserContext';

const { Meta } = Card;
const { Option } = Select;

const CardAds = ({ data }) => {
    const {user} = useContext(UserContext)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
  console.log(data)
    const showModal = () => {
      form.setFieldsValue({ title: data.title, description: data.description,street: data.street, city: data.city, state: data.state, price: data.price,type: data.type, type_of_rent: data.type_of_rent,area: data.area,bed_count: data.bed_count,room_count: data.room_count});
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
        form.validateFields()
          .then(values => {
            console.log(values)

            axios.put(`https://full-stack-virid.vercel.app/update/${data.id}`, values)
              .then(response => {
                console.log('Ad details updated successfully:', response.data);
                setIsModalVisible(false);
                toast.success("Details Updated!")
                window.location.reload();
              })
              .catch(error => {
                toast.error('Error updating ad details')
                console.error('Error updating ad details:', error);
              });
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    const handleDelete = () => {
        axios.delete(`https://full-stack-virid.vercel.app/delete/${data.id}`)
          .then(response => {
            window.location.reload();
            toast.success('Deleted Successfully!')
            console.log('Ad deleted successfully:', response.data);
          })
          .catch(error => {
            toast.error('Error while deleting')
            console.error('Error deleting ad:', error);
          });
      };
  return (
   <>    <Card
   style={{
     width: 350,
   }}
   
   cover={
    
     <img
       alt="example"
       src={data.imageSrc ? data.imageSrc:noImg}
       style={{ width: '100%', height: '200px', objectFit: 'cover' }}
     />
   }
   
   actions={[
       <Button  shape="circle" icon={<EditOutlined />} onClick={showModal}></Button>,
       <Button danger shape="circle" icon={<DeleteOutlined />}onClick={handleDelete}></Button>,
   ]}
  
 >
   <Meta
     title={data.title+" / "+data.type_of_rent}
     description={data.description}
   />
   <div className='row mt-3'>
   <p className='col-md-6 '>Price: ₹{data.price}</p>
   <p className='col-md-6'>Type: {data.type}</p>
   <p className='col-md-6'>Area: {data.area}</p>
   <p className='col-md-6'>Rooms: {data.room_count}</p>

   </div>
 </Card>
 <Modal
   title="Edit Details"
   open={isModalVisible}
   onOk={handleOk}
   onCancel={handleCancel}
 >
   <Form
     form={form}
     layout="vertical"
     initialValues={{ title: data.title, description: data.description,street: data.street, city: data.city, state: data.state, price: data.price,type: data.type, type_of_rent: data.type_of_rent,area: data.area,bed_count: data.bed_count,room_count: data.room_count}}
     >
     <Form.Item
       name="title"
       label="Title"
       rules={[{ required: true, message: 'Please input the title!' }]}
     >
       <Input />
     </Form.Item>
     <Form.Item
       name="description"
       label="Description"
       rules={[{ required: true, message: 'Please input the description!' }]}
     >
       <Input />
     </Form.Item>
   
     <div className="row">
     <Form.Item
       name="street"
       label="Street"
       className='col-md-6'
       rules={[{ required: true, message: 'Please input the street!' }]}
     >
       <Input />
     </Form.Item>
     <Form.Item
       name="area"
       label="Area"
       className='col-md-6'
       rules={[{ required: true, message: 'Please input the area!' }]}
     >
       <Input />
     </Form.Item>
     </div>
     <div className='row'>
     <Form.Item
       name="city"
       label="City"
       className='col-md-6'
       rules={[{ required: true, message: 'Please input the city!' }]}
     >
       <Input />
     </Form.Item>
     <Form.Item
       name="state"
       label="State"
       className='col-md-6'
       rules={[{ required: true, message: 'Please input the state!' }]}
     >
       <Input />
     </Form.Item>
     </div>
     <div className='row'>
     <Form.Item
       name="price"
       className='col-md-4'
       label="Price"
       rules={[{ required: true, message: 'Please input the price!' }]}
     >
       <Input />
     </Form.Item>
     <Form.Item
       name="bed_count"
       label="No. of bedrooms"
       className='col-md-4'
       rules={[{ required: true, message: 'Please input the state!' }]}
     >
       <Input />
     </Form.Item>
     <Form.Item
       name="room_count"
       className='col-md-4'
       label="No. of rooms"
       rules={[{ required: true, message: 'Please input the state!' }]}
     >
       <Input />
     </Form.Item>
     </div>
     <div className='row'>
     <Form.Item
            name="type_of_rent"
            label="Choose a type"
            className='col-md-6'
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Radio.Group>
              <Radio value="Rent">Rent</Radio>
              <Radio value="Lease">Lease</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            className='col-md-6'
            rules={[{ required: true, message: 'Please select the category!' }]}
          >
            <Select>
              <Option value="Apartment">Apartment</Option>
              <Option value="Individual Villa">Individual Villa</Option>
              <Option value="Colony">Colony</Option>
              <Option value="Others">Others</Option>
            </Select>
          </Form.Item>
          </div>
   </Form>
 </Modal></>
      
      
      )
    }
    
  


export default CardAds