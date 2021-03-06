import React from "react";
import { Form, Button, Tabs } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import { PersonalData } from '../components/personal/PersonalData.jsx';
import InsuranceForm from '../components/insurance/InsuranceForm.jsx';
import FamilyDetails from '../components/family/FamilyDetails.jsx';
const { TabPane } = Tabs;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
        md: {
            span: 24,
        },
        lg: {
            span: 24,
        },
        xl: {
            span: 24,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
        md: {
            span: 24,
        },
        lg: {
            span: 24,
        },
        xl: {
            span: 24,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 6,
            offset: 10,
        },
        sm: {
            span: 6,
            offset: 10,
        },
        md: {
            span: 6,
            offset: 11,
        },
        lg: {
            span: 6,
            offset: 11,
        },
        xl: {
            span: 6,
            offset: 12,
        },
        xxl: {
            span: 6,
            offset: 12,
        },
    },
};

const Signup = (props) => {

    const [form] = Form.useForm();

    const [activeKey, setActiveKey] = React.useState('1')
    const onKeyChange = (key) => setActiveKey(key)

    const onFinish = (values) => {

        //changing dates to string
        values.dob = values.dob._d.toISOString().split('T')[0];
        if (values.familyMembers.length !== undefined) {
            const familyMembersLength = values.familyMembers.length;
            for (let index = 0; index < familyMembersLength; index++) {
                values.familyMembers[index].date = values.familyMembers[index].date._d.toISOString().split('T')[0];
            }
        }
        console.log('Received values of form: ', values);
        form.resetFields();
        alert("Form Saved Successfully");
    };

    const onFinishFailed = () => {
        alert("Fill Missing Fields");
    };

    let insuranceStatus = form.getFieldValue('insuranceStatus');

    return (
        <>
            <div className={props.class}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError
                >
                    <Tabs defaultActiveKey="1" centered activeKey={activeKey} onChange={onKeyChange} type="line" size={"large"}>
                        <TabPane tab="Personal Information" key="1">
                            <PersonalData />
                            <Form.Item {...tailFormItemLayout}>
                                <Button icon={<RightCircleOutlined />} type="primary" htmlType="submit" onClick={() => onKeyChange('2')}>
                                    Next
                                </Button>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Insurance Information" key="2">
                            <InsuranceForm />
                            <Form.Item {...tailFormItemLayout}>
                                <Button icon={<RightCircleOutlined />} type="primary" onClick={() => onKeyChange('3')}>
                                    Next
                                </Button>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Family Information" key="3">
                            <FamilyDetails insuranceStatusPatient={insuranceStatus} />
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" onClick={() => onKeyChange('1')}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </TabPane>
                    </Tabs>
                </Form>
            </div>
        </>
    );
}

export default Signup;