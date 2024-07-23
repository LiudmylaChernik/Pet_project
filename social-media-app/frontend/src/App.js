import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext, AuthProvider } from './Auth';
import './App.css';

const App = () => {
  const { user, login, register, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/posts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data);
      }
    };
    fetchPosts();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newPost = { content };
    await axios.post('http://localhost:5001/posts', newPost, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setContent('');
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="container">
      <header>
        <h1>My Social Media</h1>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <button onClick={() => login(username, password)}>Login</button>
            <button onClick={() => register(username, password)}>Register</button>
          </>
        )}
      </header>
      <section className="auth">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
      {user && (
        <>
          <section className="new-post">
            <h3>Create a New Post</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                required
              ></textarea>
              <button type="submit">Post</button>
            </form>
          </section>
          <section className="posts">
            <h3>Posts</h3>
            <div>
              {posts.map((post, index) => (
                <div key={index} className="post">
                  {post.content}
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

const AppWithAuth = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuth;
