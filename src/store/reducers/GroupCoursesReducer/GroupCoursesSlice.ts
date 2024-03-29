import {ICourse, IErrorResponse, IUser} from "../../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {coursesReducers} from "./GetCoursesThunkCreator";
import {createCoursesReducers} from "./CreateCourseThunkCreator";

export interface ICoursesState {
    modalCourseCreation: {
        loading: boolean;
        error: IErrorResponse | null;
        isOpen: boolean;
        usersForCourseCreation: IUser[];
    };
    fetchingCourses: {
        loading: boolean;
        error: IErrorResponse | null;
    }
    groupName: string | null;
    courses: ICourse[];
}

const initialState: ICoursesState = {
    modalCourseCreation: {
        loading: false,
        error: null,
        isOpen: false,
        usersForCourseCreation: [],
    },
    fetchingCourses: {
        loading: false,
        error:  null,
    },
    groupName: null,
    courses: [],
}

export interface ICourseCreationModal {
    isOpen: boolean;
}

export const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourseCreationModal: (state, action: PayloadAction<ICourseCreationModal>) => {
            state.modalCourseCreation.isOpen = action.payload.isOpen;
        }
    },
    extraReducers: builder => {
        coursesReducers(builder);
        createCoursesReducers(builder);
    },
});

export default coursesSlice.reducer;
export const {actions, reducer} = coursesSlice;