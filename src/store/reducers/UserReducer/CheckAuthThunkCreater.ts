import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IUserState} from "./UserSlice";
import {IErrorResponse, IUserProfileRoles} from "../../../types/types";
import {thunkSelector} from "../../../hooks/redux";
import {UserService} from "../../../requests/UserService";
import {AxiosError} from "axios";

export const profileReducers = (builder: ActionReducerMapBuilder<IUserState>) => {
    builder.addCase(checkAuth.pending.type, (state) => {
        state.checkingAuth = true;
        state.error = null;
    });
    builder.addCase(checkAuth.fulfilled.type, (state, action: PayloadAction<IUserProfileRoles>) => {
        state.checkingAuth = false;
        state.error = null;
        state.profile = action.payload.userProfile;
        state.roles = action.payload.roles;
    });
    builder.addCase(checkAuth.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.checkingAuth = false;
        state.token = null;
        localStorage.removeItem("token");
    });
}

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (params, thunkAPI) => {
        console.log("checkAuth");
        try {
            const token = thunkSelector(thunkAPI).userReducer.token;
            if (!!token) {
                const responseProfile = await UserService.profile(token);
                const responseRoles = await UserService.roles(token);

                const response: IUserProfileRoles = {
                    userProfile: responseProfile.data,
                    roles: responseRoles.data
                }

                return response;
            }

            return thunkAPI.rejectWithValue({status: 401, massage: "Токена нет!"});
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
)