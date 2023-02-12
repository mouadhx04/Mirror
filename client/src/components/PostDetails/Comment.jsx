import React, { useState, useRef, useEffect } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from "../../actions/posts";

const Comments = ({ post }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [comments, setComments] = useState( post?.comments );
    const [comment, setComment] = useState('');

    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleComment = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');
        
    };

useEffect( () => {
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
}, [comment] );

  return (
    <div>
        <div className={classes.CommentsOuterContainer}>
            <div style={{width: '100%'}} className={classes.CommentsInnerContainer}>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                { comments.map( (comment, index) => (
                    <Typography key={index} variant='subtitle1'>
                        <strong>{comment.split(': ')[0]}</strong>
                        {comment.split(':')[1]}
                    </Typography>
                ) ) }
                <div ref={commentsRef} />
            </div>
            {user?.result?.name && (
            <div style={{width: '120%'}}>
                <Typography gutterBottom variant='h6'>Write new comment</Typography>
                <TextField 
                fullWidth 
                minRows={4} 
                variant="outlined" 
                label="Comment" 
                multiline 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} />
                <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                    Add
                </Button>
            </div>
            )}
        </div>
    </div>
  );
};

export default Comments;