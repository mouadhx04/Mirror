import React, {useEffect, useState} from "react";
import {Container, Grow, Grid, Paper, AppBar, TextField, Button, Typography} from "@material-ui/core";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';


import Pagination from "../Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import useStyles from './styles';

import { useDispatch } from "react-redux";
import {getPosts, getPostsBySearch} from "../../actions/posts"


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setCurrentId] = useState(null);

    const classes = useStyles();

    const dispatch = useDispatch();
    
    const history = useNavigate();

    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handelAdd = (tag) => setTags([...tags, tag]);
    const handelDelete = (tagToDelete) => setTags( tags.filter( (tag) => tag !== tagToDelete ) );
    
    
    const serachPost = () => {

        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));

            history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/posts');
        }
    };

    const handelKeyPress = (e) => {
        if (e.keyCode === 13) {
            serachPost();
        }
    };

    return (
        <Grow in>
        <Container maxWidth='xl'>
            <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar elevation={7} position='static' color='inherit' className={classes.appBarSearch} >
                        <TextField 
                        name='search'
                        variant='outlined' 
                        label='Search By Title' 
                        fullWidth 
                        value={search}
                        onKeyPress={handelKeyPress}
                        onChange={ (e) => setSearch(e.target.value) }
                        />
                        <ChipInput 
                            style={{ margin: '10px 0' }}
                            value={tags}
                            onAdd={handelAdd}
                            onDelete={handelDelete}
                            label='Search By Tags'
                            variant="outlined"
                        />
                        <Button color="primary" onClick={serachPost} variant='contained'>Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    <Paper elevation={7} className={classes.pagination}>
                        <Pagination page={page} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={9}> {/** sm is 8 here */}
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home;