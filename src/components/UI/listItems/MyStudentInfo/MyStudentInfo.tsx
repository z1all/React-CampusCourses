import React, {FC} from 'react';
import classes from './MyStudentInfo.module.css'
import {IStudent, StudentMarks, StudentStatuses} from "../../../../types/types";
import MyResultStatusStudent from "../../others/MyResultStatusStudent/MyResultStatusStudent";
import MyButton from "../../others/MyButton/MyButton";
import {IRolesThisCourse} from "../../../pages/CourseDetail/useCourseDetail";
import {studentStatuses} from "../../../consts/consts";

export interface IMyStudentInfo {
    student: IStudent;
    isLast: boolean;
    thisCourseRoles: IRolesThisCourse;
    showFinalMarkModal: (studentId: string, currentMark: StudentMarks) => void;
    showMidtermMarkModal: (studentId: string, currentMark: StudentMarks) => void;
    acceptStudent: (courseId: string, studentId: string) => void;
    declineStudent: (courseId: string, studentId: string) => void;
    editingStudentStatus: boolean;
    courseId: string;
}

const MyStudentInfo: FC<IMyStudentInfo> = ({
    student,
    isLast,
    thisCourseRoles,
    showMidtermMarkModal,
    showFinalMarkModal,
    declineStudent,
    acceptStudent,
    editingStudentStatus,
    courseId,
}) => {
    const showMarks = student.status === StudentStatuses.Accepted &&
        (!thisCourseRoles.isTeacherOrAdminThisCourse ? thisCourseRoles.userEmail === student.email : true);
    const showButtons = student.status === StudentStatuses.InQueue;

    return (
        <div className={classes.studentMainContainer + " " + (!isLast ? classes.bottomBorder : "")}>
            <div className={classes.studentInfoContainer}>
                <div className={classes.studentName}>{student.name}</div>
                <div className={classes.studentStatus}>Статус - <span
                    style={{color: studentStatuses[student.status].color}}>{studentStatuses[student.status].message}</span>
                </div>
                <div className={classes.studentEmail}>{student.email}</div>
            </div>
            <div className={classes.studentMarksContainer + " " + (showMarks ? "" : classes.displayNone)}>
                <div className={classes.studentMarkContainer + " " + classes.studentMarkRightMargin}>
                    <p className={classes.studentMarkWrapper}>
                        <span
                            className={thisCourseRoles.isTeacherOrAdminThisCourse ? classes.resultTitle : ""}
                            onClick={() => showMidtermMarkModal(student.id, student.midtermResult)}
                        >
                            Промежуточная аттестация
                        </span>
                        <span> - </span>
                        <MyResultStatusStudent status={student.midtermResult}/>
                    </p>
                </div>
                <div className={classes.studentMarkContainer}>
                    <p className={classes.studentMarkWrapper}>
                        <span
                            className={thisCourseRoles.isTeacherOrAdminThisCourse ? classes.resultTitle : ""}
                            onClick={() => showFinalMarkModal(student.id, student.finalResult)}
                        >
                            Финальная аттестацияя
                        </span>
                        <span> - </span>
                        <MyResultStatusStudent status={student.finalResult}/>
                    </p>
                </div>
            </div>
            <div className={classes.buttonsContainer + " " + (showButtons ? "" : classes.displayNone)}>
                <MyButton
                    className={classes.acceptStudentButton}
                    onClick={() => acceptStudent(courseId, student.id)}
                    loading={editingStudentStatus}
                >
                    Принять
                </MyButton>
                <MyButton
                    className={classes.rejectStudentButton}
                    onClick={() => declineStudent(courseId, student.id)}
                    loading={editingStudentStatus}
                >
                    Отклонить
                </MyButton>
            </div>
        </div>
    );
};

export default MyStudentInfo;