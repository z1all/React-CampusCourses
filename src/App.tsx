import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import CustomLayout from './components/pages/shared/CustomLayout';
import Groups from './components/pages/Groups/Groups';
import Homepage from "./components/pages/Homepage/Homepage";
import Login from './components/pages/Login/Login';
import MyCourses from "./components/pages/MyCourses/MyCourses";
import Registration from "./components/pages/Registration/Registration";
import TeachingCourses from './components/pages/TeachingCourses/TeachingCourses';
import RequireAuth from "./components/hoc/RequireAuth";
import RequireNotAuth from "./components/hoc/RequireNotAuth";
import {useAppDispatch} from "./hooks/redux";
import Profile from "./components/pages/Profile/Profile";
import {checkAuth} from "./store/reducers/UserReducer/CheckAuthThunkCreater";
import GroupCourses from "./components/pages/GroupCourses/GroupCourses";
import CourseDetail from "./components/pages/CourseDetail/CourseDetail";
import NotFound from "./components/pages/NotFound/NotFound";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    console.log("App update!")

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<CustomLayout/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path="groups" element={<RequireAuth><Groups/></RequireAuth>}/>
                    <Route path="groups/:id" element={<RequireAuth><GroupCourses/></RequireAuth>}/>
                    <Route path="courses/my" element={<RequireAuth requiredRoles={{
                        isTeacher: false,
                        isAdmin: false,
                        isStudent: true
                    }}><MyCourses/></RequireAuth>}/>
                    <Route path="courses/teaching" element={<RequireAuth requiredRoles={{
                        isTeacher: true,
                        isAdmin: false,
                        isStudent: false
                    }}><TeachingCourses/></RequireAuth>}/>
                    <Route path="courses/:id" element={<RequireAuth><CourseDetail/></RequireAuth>}/>
                    <Route path="registration" element={<RequireNotAuth><Registration/></RequireNotAuth>}/>
                    <Route path="login" element={<RequireNotAuth><Login/></RequireNotAuth>}/>
                    <Route path="profile" element={<RequireAuth><Profile/></RequireAuth>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App;