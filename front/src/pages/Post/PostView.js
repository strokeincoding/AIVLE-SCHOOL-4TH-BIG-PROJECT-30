import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Button from '../../pages/ui/Button';
import CommentList from '../../components/list/CommentList';
import styled from 'styled-components';
import './PostDetails.css'; 



/* Input */
const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
&:focus {
        outline: none;
        border-color: #007bff;
    }
`;
const StyledTextArea = styled.textarea`
  width: calc(100% - 40px); 
  padding: 10px;
  margin: 10px 0 30px 10px; 
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical; 
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  rows: 10; 
`;
const PostView = ({ history, match }) => {
  const [data, setData] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null); 
  const { no } = useParams();
  const [editContent, setEditContent] = useState(''); 
  const [editTitle, setEditTitle] = useState(''); 
  const [isEditing, setIsEditing] = useState(false); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
 

  const yourAuthToken = localStorage.getItem('token');
  const getCookieValue = (name) => (
    document.cookie.split('; ').find(row => row.startsWith(name + '='))
    ?.split('=')[1]
  );
  useEffect(() => {
    const nickname = getCookieValue('nickname');
    console.log(nickname);
    if (!nickname || nickname === 'undefined') {
      console.error('User nickname is not found or undefined');
    } else {
      setCurrentUsername(nickname);
    }
    const headers = {
      'Authorization': `Bearer ${yourAuthToken}`  
    };
    axios.get(`http://localhost:8000/post/post/${no}`, { headers })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setData(null); 
      });
    axios.get(`http://localhost:8000/post/comment/`)
      .then(response => {
        const allComments = response.data;
        const commentsForPost = allComments.filter(c => parseInt(c.post) === parseInt(no));  
        setComments(commentsForPost);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, [no, yourAuthToken]);

 
  const submitComment = () => {
    const commentData = {
        comment: newComment,
        user: currentUsername,
        post: no,
    };
    axios.post(`http://localhost:8000/post/comment/`, commentData,{
      headers: {
        'Authorization': `Bearer ${yourAuthToken}`
      }
    })
    .then(response => {
      const updatedComments = Array.isArray(comments) ? [...comments, response.data] : [response.data];
      setComments(updatedComments);  
      setNewComment('');  
    })
    .catch(error => console.error("Error posting comment: ", error));
  };
  const handleDeleteComment = (commentId) => {
    if (window.confirm("정말 댓글을 삭제하시겠습니까?")) {
      const headers = {
        'Authorization': `Bearer ${yourAuthToken}`  
      };
    axios.delete(`http://localhost:8000/post/comment/${commentId}`, { headers })
      .then(() => {
        alert('댓글이 성공적으로 삭제되었습니다.');
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setComments(updatedComments);
        navigate(`/post/post/${no}`);
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
    }
  };
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  };
  const deletePost = () => {
    if (window.confirm("정말 이 게시물을 삭제하시겠습니까?")) {
      const headers = {
        'Authorization': `Bearer ${yourAuthToken}`  
      };
      axios.delete(`http://localhost:8000/post/post/${no}`, { headers })
        .then(() => {
          alert('게시물이 성공적으로 삭제되었습니다.');
          navigate('/post'); 
          setData(null);
        })
        .catch(error => {
          console.error('Error deleting post:', error.response ? error.response.data : error);
          alert('Failed to delete the post');
        });
    }
  };
  const enableEdit = () => {
    setIsEditing(true);  
    setEditContent(data.body); 
    setEditTitle(data.title); 
  };

  const confirmEdit = () => {
    if (window.confirm("이 게시물을 수정하시겠습니까?")) {
      const headers = {
        'Authorization': `Bearer ${yourAuthToken}`
      };
      const updatedData = {
        title: editTitle,
        body: editContent
      };
      axios.put(`http://localhost:8000/post/post/${no}/`, updatedData, { headers })
        .then(() => {
          alert('게시물이 성공적으로 수정되었습니다.');
          setData({...data, title: editTitle, body: editContent}); 
        })
        .catch(error => {
          console.error('Error updating post:', error.response ? error.response.data : error);
          alert('Failed to update the post');
        });
    }
    setIsEditing(false); 
  };



  return (
    <div className="post-details-container">
      <h2 className="post-details-title">게시글 상세정보</h2>
        
          {data ? (
            <div className="post-details-content">
              <div className="post-details-row">
                {isEditing ? (
                  <StyledInput
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                  />
                ) : (
                  <>
                  <span className="post-details-label">제목</span>
                  <span className="post-details-value">{data.title}</span>
                  </>
                )}
               </div>


              <div className="post-details-row">
                <span className="post-details-label">작성자</span>
                <span className="post-details-value">{data.user}</span>
              </div>
              <div className="post-details-row">
                <span className="post-details-label">작성일</span>
                <span className="post-details-value">{formatDate(data.created_at)}</span>
              </div>
              <div className="post-details-body">
                {isEditing ? (
                  <StyledTextArea
                    rows="10"
                    value={editContent}
                    onChange={(event) => setEditContent(event.target.value)}
                  />
                ) : (
                  <div>{data.body}</div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <input
                  style={{
                    flexGrow: 1, 
                    height: '30px', 
                    marginRight: '10px' 
                  }}
                  value={newComment}
                  onChange={(event) => {
                      setNewComment(event.target.value);
                  }}
                />
                <Button style={{ marginLeft: '30px' }} title='댓글 작성' onClick={submitComment} />
              </div>

              <CommentList comments={Array.isArray(comments) ? comments : []} onDelete={handleDeleteComment} currentUser={currentUsername}/>
            </div>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
    <div className="button-group" >
    {data && currentUsername === data.user && (
      <>
        {!isEditing && (
          <Button title='수정' onClick={enableEdit} data={data}/>
        )}
 
        {isEditing && (
          <Button title='수정완료'  onClick={confirmEdit} data={data}/>
        )}
        <Button title='삭제' onClick={deletePost} data={data}/>
      </>
    )}
    <Button title='목록' onClick={() => navigate(-1)} data={data}/>
    </div>
   </div>
  );
}
 
export default PostView;