import React from "react";
import {Container} from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import ResponsiveAppBar from "./components/Navbar/newNavbar";



const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return(
    <BrowserRouter>
        <Container maxwidth='xl'>
            <ResponsiveAppBar />
            <Routes>
                <Route exact path='/' element={ <Navigate to='/posts' /> } />
                <Route exact path='/posts' element={<Home/>} />
                <Route exact path='/posts/search' element={<Home/>} />
                <Route exact path='/posts/:id' element={<PostDetails/>} />
                <Route exact path='/auth' element={ <Auth/> } />
            </Routes>
        </Container>
    </BrowserRouter>
    )
};

export default App;