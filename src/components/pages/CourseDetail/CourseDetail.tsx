import React from 'react';
import {useCourseDetail} from "./useCourseDetail";
import classes from './CourseDetail.module.css'
import './TabsStyles.css'
import {List, Popconfirm, Typography} from "antd";
import MyButton from "../../UI/others/MyButton/MyButton";
import MyCourseInfoItem from "../../UI/listItems/MyCourseInfoItem/MyCourseInfoItem";
import MyCourseInfoTabs from "../../UI/panels/MyCourseInfoTabs/MyCourseInfoTabs";
import FetchingResult from '../../hoc/FetchingResult';
import LoadingLayer from '../../hoc/LoadingLayer';
import MyCourseUsersTabs from "../../UI/panels/MyCourseUsersTabs/MyCourseUsersTabs";
import MyModalFormAddTeacher from "../../UI/modals/MyModalFormAddTeacher/MyModalFormAddTeacher";
import MyModalFormCreateNotification from "../../UI/modals/MyModalFormCreateNotification/MyModalFormCreateNotification";
import MyModalFormChangeStatus from "../../UI/modals/MyModalFormChangeStatus/MyModalFormChangeStatus";
import MyModalFormEditStudentMarks from "../../UI/modals/MyModalFormEditStudentMarks/MyModalFormEditStudentMarks";
import MyModalFormEditCourse from "../../UI/modals/MyModalFormEditCourse/MyModalFormEditCourse";
import {QuestionCircleOutlined} from "@ant-design/icons";

const {Title} = Typography;

const CourseDetail = () => {
    const {
        fetchCourse,
        addTeacherModal,
        creatNotification,
        changeCourseStatus,
        modalTypeOpen,
        editMark,
        editStatus,
        signUp,
        editCourse,
        deleteCourse,
    } = useCourseDetail();

    console.log("CourseDetail update!");

    return (
        <>
            <div className={classes.courseDetailContainerWrapper}>
                <div className={classes.courseDetailContainer}>
                    <LoadingLayer isLoading={fetchCourse.fetchingCourse.loading}>
                        <FetchingResult error={fetchCourse.fetchingCourse.error}>
                            <Title level={1}>{fetchCourse.courseDetails.name}</Title>
                            <div className={classes.courseTopContainer}>
                                <Title level={4} className={classes.title}>Основные данные курса</Title>
                                <div>
                                    {fetchCourse.rolesThisCourse.isTeacherOrAdminThisCourse ?
                                        <MyButton className={classes.editButton} size="large" onClick={editCourse.showModal}>Редактировать</MyButton>
                                        :
                                        <></>
                                    }
                                    {fetchCourse.rolesThisCourse.isAdmin ?
                                        <Popconfirm
                                            onConfirm={deleteCourse}
                                            title={`Удаление курса`}
                                            description="Вы уверены, что хотите удалить этот курс?"
                                            okType="danger"
                                            okText="Удалить"
                                            cancelText="Отмена"
                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                        >
                                            <MyButton className={classes.deleteButton} size="large">Удалить</MyButton>
                                        </Popconfirm>
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                            <div>
                                <List
                                    className={classes.infoList}
                                    bordered>
                                    <List.Item className={classes.infoListItem}>
                                        <div className={classes.topInfoListItem}>
                                            <MyCourseInfoItem title={"Статус курса"} value={fetchCourse.courseDetails.status.message} style={{color: fetchCourse.courseDetails.status.color}} flex={"1"}/>
                                            {fetchCourse.rolesThisCourse.isTeacherOrAdminThisCourse ?
                                                <MyButton className={classes.editButton} size="large" onClick={changeCourseStatus.showModal}>Изменить</MyButton>
                                                :
                                                <></>
                                            }
                                            {fetchCourse.canSignUp ?
                                                <MyButton className={classes.singUpButton} size="large" onClick={signUp.do} disabled={signUp.loading}>Записаться на курс</MyButton>
                                                :
                                                <></>
                                            }
                                        </div>
                                    </List.Item>
                                    <List.Item className={classes.infoListItem}>
                                        <MyCourseInfoItem title={"Учебный год"} value={fetchCourse.courseDetails.yearStart} flex={"1"}/>
                                        <MyCourseInfoItem title={"Семестр"} value={fetchCourse.courseDetails.semester.massage} flex={"1"}/>
                                    </List.Item>
                                    <List.Item className={classes.infoListItem}>
                                        <MyCourseInfoItem title={"Всего мест"} value={fetchCourse.courseDetails.maximumStudentsCount} flex={"1"}/>
                                        <MyCourseInfoItem title={"Студентов зачислено"} value={fetchCourse.courseDetails.acceptedStudents} flex={"1"}/>
                                    </List.Item>
                                    <List.Item className={classes.infoListItem}>
                                        <MyCourseInfoItem title={"Заявок на рассмотрении"} value={fetchCourse.courseDetails.inQueueStudents} flex={"1"}/>
                                    </List.Item>
                                </List>
                            </div>
                            <div className={classes.infoTabsContainer}>
                                <MyCourseInfoTabs
                                    notifications={fetchCourse.courseDetails.notifications}
                                    annotations={fetchCourse.courseDetails.annotations}
                                    requirements={fetchCourse.courseDetails.requirements}
                                    thisCourseRoles={fetchCourse.rolesThisCourse}
                                    showCreateNotificationModal={creatNotification.showModal}
                                />
                            </div>
                            <div className={classes.usersTabsContainer}>
                                <MyCourseUsersTabs
                                    students={fetchCourse.courseDetails.students}
                                    teachers={fetchCourse.courseDetails.teachers}
                                    thisCourseRoles={fetchCourse.rolesThisCourse}
                                    showAddTeacherModal={addTeacherModal.showModal}
                                    showFinalMarkModal={editMark.showFinalMarkModal}
                                    showMidtermMarkModal={editMark.showMidtermMarkModal}
                                    acceptStudent={editStatus.acceptStudent}
                                    declineStudent={editStatus.declineStudent}
                                    editingStudentStatus={editStatus.loading}
                                    courseId={editStatus.courseId}
                                />
                            </div>
                        </FetchingResult>
                    </LoadingLayer>
                </div>
            </div>
            <MyModalFormAddTeacher
                modalTypeOpen={modalTypeOpen}
                cancelModalHandler={addTeacherModal.cancelModalHandler}
                onFinishHandler={addTeacherModal.onFinishHandler}
                modalForm={addTeacherModal.modalForm}
                users={addTeacherModal.users}
            />
            <MyModalFormCreateNotification
                modalTypeOpen={modalTypeOpen}
                cancelModalHandler={creatNotification.cancelModalHandler}
                onFinishHandler={creatNotification.onFinishHandler}
                modalForm={creatNotification.modalForm}
            />
            <MyModalFormChangeStatus
                modalTypeOpen={modalTypeOpen}
                cancelModalHandler={changeCourseStatus.cancelModalHandler}
                onFinishHandler={changeCourseStatus.onFinishHandler}
                modalForm={changeCourseStatus.modalForm}
                startValue={changeCourseStatus.startValue}
            />
            <MyModalFormEditStudentMarks
                modalTypeOpen={modalTypeOpen}
                cancelModalHandler={editMark.cancelModalHandler}
                onFinishHandler={editMark.onFinishHandler}
                modalForm={editMark.modalForm}
                startValue={editMark.startValue}
            />
            <MyModalFormEditCourse
                modalCourseEdit={editCourse.modal}
                cancelModalHandler={editCourse.cancelModalHandler}
                courseOnFinishHandler={editCourse.onFinishHandler}
                courseOnFinishHandlerForTeacher={editCourse.onFinishHandlerForTeacher}
                modalForm={editCourse.modalForm}
                modalFormForTeacher={editCourse.modalFormForTeacher}
                isForTeacher={editCourse.isForTeacher}
                setFieldsCallback={editCourse.setFieldsCallback}
            />
        </>
    );
};

/* login
{
  "email": "gymboss@gachi.com",
  "password": "B0yNextD00r"
}
*/

export default CourseDetail;