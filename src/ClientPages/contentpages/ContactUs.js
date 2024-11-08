"use client";

import React, { useEffect, useState } from "react";
import ContentTitle from "../../components/ContentTitle";
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Form,
  Spinner,
  Card,
} from "react-bootstrap";
import FormField from "../../components/FormField";
// import { Link, useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumber } from "libphonenumber-js";
import {
  imgAddr,
  useGetContactUsQuery,
  useSubmitQueryMutation,
} from "../../features/api";
import toast from "react-hot-toast";
import { getError } from "../../utils/error";
import { useDispatch, useSelector } from "react-redux";
import {
  resetContactFormData,
  selectContactUsData,
  updateContactFormData,
} from "../../features/contactUsSlice";
import ScrollToTop from "../../components/ScrollToTop";

function ContactUs() {
  const contactFormData = useSelector(selectContactUsData);
  // const [contactFormData , setFormData] = useState({});
  const [submitQuery, { isLoading }] = useSubmitQueryMutation();
  const { data } = useGetContactUsQuery();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    dispatch(updateContactFormData({ [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(contactFormData?.mobile);

    if (contactFormData?.mobile) {
      const phoneNumber = parsePhoneNumber(
        contactFormData?.mobile?.replace(contactFormData?.dialCode, ""),
        contactFormData?.countryCode?.toUpperCase()
      );
      if (phoneNumber && phoneNumber.isValid()) {
        try {
          console.log("Form Data:", contactFormData);
          const data = await submitQuery({
            email: contactFormData?.email,
            name: contactFormData?.name,
            mobile: contactFormData?.mobile,
            address: contactFormData?.addr,
            company_name: contactFormData?.companyName,
            message: contactFormData?.message,
          }).unwrap();

          toast.success(data?.message);
          dispatch(resetContactFormData());
          router.push("/");
        } catch (error) {
          getError(error);
          console.log("error submitting form", error);
        }
      } else {
        toast.error("Enter a valid mobile number");
      }
    } else {
      toast.error("Enter Mobile number");
    }
  };

  return (
    <section className="account-bg full-section py-3">
      <ScrollToTop />
      <Container>
        <Card className="glass-card rounded-4 p-0  overflow-hidden">
          <Card.Header
            className="p-0 border-0 rounded-top-4"
            style={{ background: "url(bg/footerBg.png)" }}
          >
            <Row className="">
              <Col
                md={6}
                className=" ps-md-5 d-flex align-items-center justify-content-md-start justify-content-center"
              >
                <h2 className="text-white fw-bold  mt-2">Contact Us</h2>
              </Col>
              <Col className="pb-0 pt-1 pe-md-4 px-4 px-md-2 d-flex align-items-center justify-content-center">
                <Image
                  fluid
                  src="/logo/contact-logo.png"
                  style={{ maxHeight: "150px" }}
                />
              </Col>
            </Row>
          </Card.Header>

          <Card.Body>
            <Form onSubmit={handleFormSubmit} className="text-white">
              <Row>
                <Col md={6}>
                  <FormField
                    label="Full name"
                    placeholder="Enter your Full name"
                    name={"name"}
                    type={"text"}
                    value={contactFormData.name}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col>
                  <FormField
                    label="Company name"
                    placeholder="Company/Organisation name"
                    name="companyName"
                    value={contactFormData.companyName}
                    onChange={handleInputChange}
                    required={false}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormField
                    label="Email"
                    type="email"
                    placeholder="Enter your Email Id"
                    name="email"
                    value={contactFormData.email}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col>
                  <Form.Label
                    className="fw-bold"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Phone number{" "}
                    <span style={{ color: "rgba(217, 64, 4, 1)" }}>*</span>
                  </Form.Label>
                  <PhoneInput
                    inputClass="form-field text-white w-100 "
                    buttonClass="form-field"
                    dropdownClass="text-black"
                    country={"in"}
                    enableSearch={true}
                    countryCodeEditable={false}
                    value={contactFormData?.mobile}
                    onChange={(phone, code) => {
                      // setFormData((prevData)=> ({...prevData,  mobile: phone,countryCode: code.countryCode, dialCode:code.dialCode }));

                      dispatch(
                        updateContactFormData({
                          mobile: phone,
                          countryCode: code.countryCode,
                          dialCode: code.dialCode,
                        })
                      );
                      // console.log('in phone',code,phone);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mt-3 mt-md-1">
                  <FormField
                    label="Message"
                    as="textarea"
                    rows={5}
                    placeholder="Leave us a message..."
                    name="message"
                    value={contactFormData?.message}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Check
                    type="checkbox"
                    id="privacy-checkbox"
                    style={{ fontSize: "0.9rem" }}
                    label={
                      <p style={{ color: "rgba(126, 126, 126, 1)" }}>
                        You agree to our friendly{" "}
                        <Link
                          href={"/privacy-policy"}
                          style={{ color: "rgba(126, 126, 126, 1)" }}
                        >
                          Privacy Policy.
                        </Link>
                        <span style={{ color: "rgba(217, 64, 4, 1)" }}> *</span>
                      </p>
                    }
                    required
                  />
                </Col>
              </Row>

              <Row className="justify-content-end">
                <Col md={4}>
                  <Button
                    variant="transparent"
                    disabled={isLoading}
                    className="text-white w-100 my-3 fw-bold form-btn"
                    type="submit"
                  >
                    {isLoading ? (
                      <Spinner variant="border" size="sm" />
                    ) : (
                      "  Send message"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      {/* <Container>
        <Row className='flex-row-reverse'>
          
          <Col>
               <Form onSubmit={handleFormSubmit} className='text-white'>
                  <p>Our friendly team would love to hear from you</p>

                  <Row>
                    <Col>
                      <FormField
                          label='Full name*'
                          placeholder='Full name'
                          name={'name'}
                          type={'text'}
                        
                          value={contactFormData.name}
                          onChange={handleInputChange}
                      />
                    </Col>
                    <Col>
                      <FormField
                          label='Company name'
                          placeholder='Company/organisation name'
                          name='companyName'
                          value={contactFormData.companyName}
                          onChange={handleInputChange}
                          required={false}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormField
                          label='Email*'
                          type='email'
                          placeholder='you@company.com'
                          name='email'
                          value={contactFormData.email}
                          onChange={handleInputChange}
                      />
                    </Col>
                    <Col>
                    
                <Form.Label className='fw-bold' style={{ fontSize: '0.8rem' }}>Mobile*</Form.Label>
                <PhoneInput
                
                inputClass='form-field text-white w-100'
                buttonClass='form-field'
                dropdownClass='text-black'
  country={'in'}
 enableSearch={true}
 countryCodeEditable={false}
 value={contactFormData?.mobile}
  
  onChange={(phone,code) =>{ 

    // setFormData((prevData)=> ({...prevData,  mobile: phone,countryCode: code.countryCode, dialCode:code.dialCode }));

    dispatch(updateContactFormData({
      mobile:phone,
      countryCode:code.countryCode,
      dialCode:code.dialCode
    })) 
    // console.log('in phone',code,phone);
  }
  }
/>
                
                    
                    </Col>
                  </Row>
                  <Row>
                  <Col>
                      <FormField
                          label='Address*'
                          type='text'
                          placeholder='city,state,country'
                          name='addr'
                          value={contactFormData.addr}
                          onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormField
                          label='Message*'
                          as='textarea'
                          rows={5}
                          placeholder='Leave us a message...'
                          name='message'
                          value={contactFormData.message}
                          onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <Form.Check 
            type='checkbox'
            id='privacy-checkbox'
            label={<>You agree to our friendly <Link to={'/privacy-policy'} style={{color:'white'}}>Privacy Policy</Link></>}
            required
            
          />
                    </Col>
                  </Row>
                <Row>
                  <Col>
                    <Button variant='transparent' disabled={isLoading}  className="text-white w-100 my-3 fw-bold form-btn" type='submit'>
                     {isLoading?<Spinner variant='border' size='sm'/>:'  Send message'} 
                      </Button>
                  </Col>
                </Row>

               </Form>
          </Col>

          <Col md={6}>
          <div>
            {data &&
            data?.contacts?.map((contact,index)=>(
              <Image key={contact?._id} src={`${imgAddr}/${contact?.image_url}`} className='rounded-4' style={{width:'100%',maxHeight:'550px'}} fluid />

            ))
            }

          </div>
          </Col>
        </Row>
      </Container>  */}
    </section>
  );
}

export default ContactUs;
