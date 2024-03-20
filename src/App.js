import { useMemo, useState } from 'react';
import './styles/App.css' 
import PostList from './PostList';
import PostForm from './PostForm';
import PostFilter from './PostFilter';
import MyModal from './UI/MyModal/MyModal';
import MyButton from './UI/button/MyButton';

function App() {
  const [posts,setPosts] = useState([
    {id: 1, title: 'Ноутбук', body: 'прочный, надежный, цена приятная'},
    {id: 2, title: 'Фен', body: 'сломался через месяц'},
    {id: 3, title: 'Мышь', body: 'Отличный сенсор'},
  ])

  const [filter,setFilter] = useState({sort: '', query: ''})
  const [modal,setModal] = useState(false)


  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
    } 
    return posts
  }, [filter.sort,posts])

  const sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter((post) => post.title.toLocaleLowerCase().includes(filter.query))
  }, [filter.query,sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter((p => p.id !== post.id)))
  }
  
  return (
    <div className="App">
    <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
      Создать отзыв
    </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm createPost={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список отзывов'}/>
    </div>
  );
}

export default App;
