import React,{ useState }  from 'react'
import emailjs from "emailjs-com";
import { useForm } from "react-hook-form";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { Form, message,Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";


function ContactUs() {
    const [successMessage, setSuccessMessage] = useState("");
    const [description, setDescription] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const { TextArea } = Input;
  const serviceID = "service_6q6tfeh";
  const templateID = "template_kibiqjb";
  const userID = "3F2c29oOTMEFoIqJ2";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log("onFinish" +values);
    try {
      dispatch(ShowLoading());
      sendEmail(
        serviceID,
        templateID,
        {
          name: values.name,
          phone: values.phone,
          email: values.email,
          subject: values.subject,
          description: description
        },userID);
    
      dispatch(HideLoading());
    }catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    
  };
  const handleMessageChange = event => {
    // 👇️setDescription access textarea value
    setDescription(event.target.value);
    console.log(event.target.value);
  };
  const onSubmit = (data, r) => {
    sendEmail(
      serviceID,
      templateID,
      {
        name: data.name,
        phone: data.phone,
        email: data.email,
        subject: data.subject,
        description: description
      },
      userID
    )
    r.target.reset();
  }

  const sendEmail = (serviceID, templateID, variables, userID) => {
    emailjs.send(serviceID, templateID, variables, userID)
      .then(() => {
        message.success("Email sent successfully.We will contact you shortly");
      }).catch(err => console.error(`Something went wrong ${err}`));
  }

  return (
   <div>
   
   <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item label="Name" name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <input type="text" placeholder="Name" />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
            ]}
          >
            <input type="text" placeholder="Phone Number" />
          </Form.Item>
     
          <Form.Item label="Subject" name="subject"
            rules={[
              {
                required: true,
                message: "Please input Subject!",
              },
            ]}
          >
            <input type="text" placeholder="Subject" />
          </Form.Item>

          
       
          <TextArea rows={4} placeholder="Please Provide the Details of the Books you want to Book Online" maxLength={200} onChange={handleMessageChange} />
          <div className="text-center mt-2 flex flex-col gap-1">
            <Button title="ContactUs" type="submit" />
          
          </div>
        </Form>
   </div>
)
}

export default ContactUs
