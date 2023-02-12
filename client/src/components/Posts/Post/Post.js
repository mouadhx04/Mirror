import React, {useState} from "react";

import { Card, CardActions, CardMedia, CardContent, Typography, Button} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { useNavigate } from "react-router-dom";

import UseStyles from "./styles";
import moment from "moment";
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts'

import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Post = ({ post, setCurrentId }) => {

    const classes = UseStyles();
    const dispatch = useDispatch();
    const history = useNavigate();

    const user = JSON.parse(localStorage.getItem('profile'));

    const openPost = () => {
        history(`/posts/${post._id}`);
    }

    const [likes, setLikes] = useState(post?.likes);
    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><FavoriteOutlinedIcon fontSize="small" />&nbsp;{`${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><FavoriteBorderOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><FavoriteBorderOutlinedIcon fontSize="small" />&nbsp;Like</>;
      };

    return (
        <Card className={classes.card} raised elevation={6}> 
                <div onClick={openPost} style={{cursor: 'pointer'}}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                { (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button 
                        style={{color: 'white'}} 
                        size="small" 
                        onClick={ () => setCurrentId(post._id) } >
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
                ) }
                <div className={classes.details} >
                    <Typography variant="body2" color="textSecondary"> {post.tags.map( (tag) => `#${tag} ` )} </Typography>
                </div>
                <Typography className={classes.title} variant="h5" >{post.title}</Typography>
                <CardContent>
                    <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '12rem'}}>
                        <Typography className={classes.message} variant="body2" color="textSecondary" component='p' noWrap> {post.message} </Typography>
                    </div>
                </CardContent>
                </div>
            <CardActions className={classes.CardActions} disableSpacing>

            <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                <Likes />
            </Button>
                    

            { (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button className={classes.rightAlignItem} size="small" color='secondary' onClick={ () => dispatch(deletePost(post._id)) }>
                        <DeleteIcon fontSize="small"/> Delete
                </Button>
            ) }

            </CardActions>
        </Card>
    );
}

export default Post;