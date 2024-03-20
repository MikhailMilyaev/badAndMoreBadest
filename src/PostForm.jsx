import React from 'react'
import { useState } from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'

const PostForm = ({createPost}) => {
    const [post,setPost] = useState({title: '', body: ''})

    const addNewPost = (event) => {
        event.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        createPost(newPost)
        setPost({title: '', body: ''})
      }
      
      

  return (
    <form>
    <MyInput 
    value={post.title}
    onChange={(event) => setPost({...post, title: event.target.value})}
    type='text' 
    placeholder='Товар'
    />
    <MyInput 
    value={post.body}
    onChange={(event) => setPost({...post, body: event.target.value})}
    type='text' 
    placeholder='Описание'
    />
    <MyButton onClick={addNewPost}>Создать</MyButton>
  </form>
  )
}

export default PostForm