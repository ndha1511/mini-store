import { useEffect, useState } from "react";
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Col, Form } from "react-bootstrap";
import { registerUser } from "../../services/userService";
import { Link } from "react-router-dom";

function Register() {
    const { Formik } = formik;
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const trimTrailingWhitespace = value => value.replace(/\s+$/, '');
    const schema = yup.object().shape({
        fullName: yup.string().required("Họ tên không được để trống"),
        phoneNumber: yup.string().transform(trimTrailingWhitespace).matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ').required("Số điện thoại không được để trống"),
        password: yup.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên").required("Mật khẩu không được để trống"),
        rePassword: yup.string().oneOf([yup.ref('password')], "Mật khẩu nhập lại không khớp").required(),
    });
    useEffect(() => {
        document.title = 'Đăng ký';
    }, []);
    return (
        <div className="login">
            <h2>Đăng ký tài khoản</h2>
            <div className="box-login">
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => {
                        const data = {...values};
                        console.log(data);
                        registerUser(data).then(() => {

                        }).catch(err => setPhoneNumberError("Số điện thoại đã có người sử dụng"))
                    }}
                    initialValues={{
                        fullName: '',
                        phoneNumber: '',
                        password: '',
                        rePassword: '',
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>


                            <Form.Group as={Col} md="12" controlId="validationCustom01" >
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    isInvalid={!!errors.fullName}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.fullName}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationCustom02">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onChange={(e) => {handleChange(e); setPhoneNumberError('')}}
                                    isInvalid={!!errors.phoneNumber}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.phoneNumber}</Form.Control.Feedback>
                                {phoneNumberError && <Form.Text className="text-danger">{phoneNumberError}</Form.Text>}
                            </Form.Group>



                            <Form.Group as={Col} md="12" controlId="validationCustom03" >
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                            </Form.Group>



                            <Form.Group as={Col} md="12" controlId="validationCustom04" >
                                <Form.Label>Nhập lại mật khẩu</Form.Label>
                                <Form.Control
                                    name="rePassword"
                                    type="password"
                                    value={values.rePassword}
                                    onChange={handleChange}
                                    isInvalid={!!errors.rePassword}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.rePassword}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="12" className="mt-5">
                                <Button variant='primary' type='submit' style={{width: "100%"}}>Đăng ký</Button>

                            </Form.Group>
                            <Form.Group as={Col} md="12" className="mt-5">
                                <Link to={"/trang-chu"}>Vể trang chủ</Link>

                            </Form.Group>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Register;