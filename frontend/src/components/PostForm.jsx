import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '@shared/redux/slices/postsSlice';

function PostForm(){
    const dispatch = useDispatch();

    const [postName, setPostName] = useState('');
    const [postContent, setPostContent] = useState('');

    const handleSubmit = (e) => {
        dispatch(
            createPost(
                {
                postName,
                postContent
            })
        )
        setPostName("");
        setPostContent("");
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Post Name</label>
            <input 
                placeholder="Enter Post Name"
                onChange={(e) => setPostName(e.target.value)}>
            </input>
            <label>Post Content</label>
            <input
                placeholder="Enter Post Content"
                onChange={(e) => setPostContent(e.target.value)}
                >
            </input>

            <button type="submit" className={"button"}>Submit</button>

        </form>
    );
}

export default PostForm;