import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICourseDetails, IErrorResponse, IUser, MarkType, StudentMarks} from "../../../types/types";
import {courseDetailsReducers} from "./GetCourseDetailsThunkCreator";
import {addTeacherToCourseReducers} from "./AddTeacherToCourseThunkCreator";
import {createNotificationReducers} from "./CreateNotificationThunkCreator";
import {changeCourseStatusReducers} from "./ChangeStatusThunkCreator";
import {deleteCourseReducers} from "./DeleteCourseThunkCreator";
import {editStudentMarkReducers} from "./EditStudentMarkThunkCreator";

export enum courseModalType {
    addTeacher,
    createNotification,
    changeCourseStatus,
    editStudentMidtermMark,
    editStudentFinalMark,
}

export interface ICourseDetailsState {
    fetchingCourse: {
        loading: boolean;
        error: IErrorResponse | null;
        usersForAddTeacher: IUser [];
    }
    modal: {
        loading: boolean;
        error: IErrorResponse | null;
        modalTypeOpen: courseModalType | null;
    };
    editingStudentMark: {
        markType: MarkType | null;
        studentId: string;
        lastMark: StudentMarks | null;
    };
    course: ICourseDetails | null;
}

const initialState: ICourseDetailsState = {
    fetchingCourse: {
        loading: false,
        error: null,
        usersForAddTeacher: [],
    },
    modal: {
        loading: false,
        error: null,
        modalTypeOpen: null,
    },
    editingStudentMark: {
        markType: null,
        studentId: "",
        lastMark: null,
    },
    course: null,
}

export interface IModal {
    modalTypeOpen: courseModalType | null;
}

export interface IEditMarkModal{
    markType: MarkType | null;
    studentId: string;
    currentMark: StudentMarks | null;
}

export const courseDetailsSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourseModal: (state, action: PayloadAction<IModal>) => {
            state.modal.modalTypeOpen = action.payload.modalTypeOpen;
        },
        setEditMarkModal: (state, action: PayloadAction<IEditMarkModal>) => {
            state.modal.modalTypeOpen = action.payload.markType === MarkType.Final ?
                courseModalType.editStudentFinalMark : courseModalType.editStudentMidtermMark;

            if(action.payload.markType === null) state.modal.modalTypeOpen = null;

            state.editingStudentMark = {...action.payload, lastMark: action.payload.currentMark};
        }
    },
    extraReducers: builder => {
        courseDetailsReducers(builder);
        addTeacherToCourseReducers(builder);
        createNotificationReducers(builder);
        changeCourseStatusReducers(builder);
        deleteCourseReducers(builder);
        editStudentMarkReducers(builder);
    },
});

export default courseDetailsSlice.reducer;
export const {actions} = courseDetailsSlice;