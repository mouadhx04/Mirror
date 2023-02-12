import React, {useState, useEffect} from 'react'
import { Paper, Typography, CircularProgress, Divider, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";
import useStyles from "./styles";

import {getPost, getPostsBySearch} from "../../actions/posts";

import Comments from './Comment';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



const PostDetails = () => {
  const {post, posts, isLoading} = useSelector( (state) => state.posts );
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect( () => {
    dispatch( getPost( id ) );
  }, [id] )

  useEffect( () => {
    if (post) {
      dispatch( getPostsBySearch( { search: 'none', tags: post?.tags.join(',') } ) );
    }
  }, [post] )

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={7} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    )
  }
  // eslint-disable-next-line no-lone-blocks
  {
    /**
     * TypeError: Cannot read property 'Name' of undefined
     * This usualy means that we were trying to render something before the data was actualy fetched
     * These two blocks above checks that we don't try to render this jsx block below if we haven't the a post before
     */
  }

  const recommendedPosts = posts.filter( ( { _id } ) => _id !== post._id );

  const openPost = (_id) => history(`/posts/${_id}`);
  
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={7} >
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography style={{fontFamily: 'Andalé Mono'}} variant="h2" component="h4">
            {post.title} &nbsp;
          </Typography>

          <Divider style={{ margin: '20px 0' }} />
          <Typography style={{fontFamily: 'Andalé Mono'}} gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography style={{fontFamily: 'Andalé Mono'}} gutterBottom variant="h4" component="p">{post.message}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h5" style={{fontFamily: 'Andalé Mono'}}>Creator: {post.name}</Typography>
          <Typography variant="body1" style={{fontFamily: 'Andalé Mono'}}>{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Comments post={post} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile} alt={post.title} />
        </div>
      </div>
      {/** here the logic of the recommanded posts  */}
      { (recommendedPosts) && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h6' style={{fontFamily: 'Andalé Mono'}}> You might also like: </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            { recommendedPosts.map( ( { title, message, name, likes, selectedFile, _id } ) => (
              <div key={_id} style={{ margin: '20px', cursor: 'pointer' }} onClick={ () => openPost(_id) } > 
                <Typography gutterBottom variant='h5'>{title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                <Typography gutterBottom variant='subtitle2'>Likes: {likes.length}</Typography>
                <img alt={title} src={selectedFile} width='200px'></img>
              </div>
            ) ) }
          </div>
        </div>
      ) }
    </Paper>
  )
}

export default PostDetails
// 'rafce': to create react component install from extensions 'ES7 react redux snippet'