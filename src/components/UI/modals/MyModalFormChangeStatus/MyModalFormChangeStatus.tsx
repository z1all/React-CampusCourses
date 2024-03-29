import React, {FC} from 'react';
import {Form, FormInstance, Modal, Radio} from "antd";
import {courseModalType} from "../../../../store/reducers/CourseDetailReducer/CourseDetailsSlice";
import classes from "./MyModalFormChangeStatus.module.css";
import MyButton from "../../others/MyButton/MyButton";
import {CourseStatuses} from "../../../../types/types";
import {statuses} from "../../../consts/consts";
import {statusRules} from "./Validations";

export interface IMyModalFormChangeStatus {
    modalTypeOpen: courseModalType | null;
    cancelModalHandler: any;
    onFinishHandler: any;
    modalForm: FormInstance<IFormChangeStatus>;
    startValue: CourseStatuses;
}

export interface IFormChangeStatus {
    status: CourseStatuses;
}

const MyModalFormChangeStatus: FC<IMyModalFormChangeStatus> = ({modalTypeOpen, cancelModalHandler, onFinishHandler, modalForm, startValue}) => {
    const title = "Изменение статуса курса";
    const buttonText = "Сохранить";

    const OpenForAssigningDisabled = startValue === CourseStatuses.Started || startValue === CourseStatuses.Finished;
    const StartedDisabled = startValue === CourseStatuses.Finished;
    const FinishedDisabled = false;

    return (
        <>
            <Modal
                centered
                open={modalTypeOpen === courseModalType.changeCourseStatus}
                footer={false}
                onCancel={cancelModalHandler}
                title={title}
                width={700}>
                <Form
                    form={modalForm}
                    layout="vertical"
                    requiredMark="optional"
                    onFinish={onFinishHandler}>
                    <Form.Item
                        name="status"
                        rules={statusRules}
                        initialValue={startValue === CourseStatuses.Created ? null : startValue}>
                        <Radio.Group>
                            <Radio value="OpenForAssigning" disabled={OpenForAssigningDisabled}>{statuses[CourseStatuses.OpenForAssigning].message}</Radio>
                            <Radio value="Started" disabled={StartedDisabled}>{statuses[CourseStatuses.Started].message}</Radio>
                            <Radio value="Finished" disabled={FinishedDisabled}>{statuses[CourseStatuses.Finished].message}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item className={classes.changeStatusModalButtonContainer}>
                        <MyButton type="default" onClick={cancelModalHandler}>Отмена</MyButton>
                        <MyButton htmlType="submit" className={classes.changeStatusModalButtonSave}>{buttonText}</MyButton>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MyModalFormChangeStatus;