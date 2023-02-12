import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import useStyles from './styles';
import { LinearProgress, Grid, Typography } from "@material-ui/core";

const Posts = ( setCurrentId ) => {

    const {posts, isLoading} = useSelector((state) => state.posts);
    const classes = useStyles();

    if ( !posts.length && !isLoading) return (
        <Typography variant="h5" style={{fontFamily: 'Andalé Mono'}}> No Posts.. </Typography>
    );

    return (
        isLoading ? <LinearProgress color="primary"/> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map( (post, index) => (
                    <Grid key={index} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ) )}
            </Grid>    
        )
    );
}

export default Posts;