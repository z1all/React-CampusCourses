import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IErrorResponse, IGroup} from "../../../types/types";
import {AxiosError} from "axios";
import {IGroupsState} from "./GroupsSlice";
import {GroupsService} from "../../../requests/GroupsService";
import {customNotifications} from "../../../notifications/Notifications";

export const deleteGroupReducers = (builder: ActionReducerMapBuilder<IGroupsState>) => {
    builder.addCase(deleteGroup.pending.type, (state) => {
        state.deletingGroup.loading = true;
        state.deletingGroup.error = null;

        customNotifications.loading({massage: 'Удаление группы...', key: 'deleteGroup'});
    });
    builder.addCase(deleteGroup.fulfilled.type, (state, action: PayloadAction<IGroup[]>) => {
        state.deletingGroup.loading = false;
        state.deletingGroup.error = null;
        state.groups = action.payload;

        customNotifications.success({massage: 'Успешное удаление!', key: 'deleteGroup'});
    });
    builder.addCase(deleteGroup.rejected.type, (state, action: PayloadAction<IErrorResponse>) => {
        state.deletingGroup.loading = false;
        state.deletingGroup.error = action.payload;

        let errorMessage = "Произошла неизвестная ошибка!";
        if(action.payload.status === 404) {
            errorMessage = "Группа уже была удалена другим пользователем!";
        }
        customNotifications.error({massage: errorMessage, key: 'deleteGroup'});
    });
}

export const deleteGroup = createAsyncThunk(
    'groups/deleteGroups',
    async (group: IGroup, thunkAPI) => {
        try {
            await GroupsService.deleteGroup(group.id);
            const response = await GroupsService.groups();
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue({status: err.response?.status, massage: ""});
        }
    }
);