import React from 'react';
import classes from './Profile.module.css'
import {DatePicker, Form, Input, Typography} from "antd";
import MyButton from "../../UI/others/MyButton/MyButton";
import dayjs from "dayjs";
import {birthdayRules, fullNameRules} from "./Validations";
import {useProfile} from "./useProfile";
import {serverDateFormat, viewDateFormat} from "../../consts/consts";

const {Title} = Typography;

const Profile = () => {
    const {editHandler, profile, editLoading, form, currentDate} = useProfile();

    console.log("Profile update!");

    return (
        <div className={classes.profileContainerWrapper}>
            <div className={classes.profileContainer}>
                <Title level={2}>Профиль</Title>
                <Form
                    layout="vertical"
                    form={form}
                    className={classes.loginForm}
                    requiredMark={false}
                    onFinish={editHandler}
                    disabled={editLoading}>
                    <Form.Item
                        label="ФИО"
                        name="fullName"
                        rules={fullNameRules}
                        initialValue={profile?.fullName}>
                        <Input placeholder="Иванов Иван Иванович" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={profile?.email}>
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        label="День рождения"
                        name="birthDate"
                        rules={birthdayRules}
                        initialValue={dayjs(profile?.birthDate, serverDateFormat)}>
                        <DatePicker
                            format={viewDateFormat}
                            className={classes.profileFormDatePiker}
                            minDate={dayjs('01.01.1900', viewDateFormat)}
                            maxDate={dayjs(currentDate, viewDateFormat)}
                        />
                    </Form.Item>
                    <Form.Item className={classes.profileFormEditButtonContainer}>
                        <MyButton htmlType="submit" loading={editLoading}>Изменить</MyButton>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Profile;