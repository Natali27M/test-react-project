import {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import {Layout} from "./components";
import {AuthPage, CommentsPage, PostsPage} from "./pages";


const App: FC = () => {
    return (
        <div>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<PostsPage/>}/>
                </Route>
                <Route path={"/comments"} element={<CommentsPage/>}/>
                <Route path="/login" element={<AuthPage />} />
            </Routes>
        </div>
    );
};

export {App};
