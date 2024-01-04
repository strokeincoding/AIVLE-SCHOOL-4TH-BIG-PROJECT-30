import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';
import Button from '../../pages/ui/Button';
import CommentList from '../../components/list/CommentList';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
/* Container */
const Container = styled.div`
    background: white;
    width: 100%;
    max-width: 720px;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;


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
const PostView = ({ history, match }) => {
  const [data, setData] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null); // 로그인한 사용자의 닉네임
  const { no } = useParams();
  const [editContent, setEditContent] = useState(''); // 게시물 내용
  const [editTitle, setEditTitle] = useState(''); // 게시물 제목
  const [isEditing, setIsEditing] = useState(false);  // 편집 모드 상태
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
 

  const yourAuthToken = localStorage.getItem('token');
  const getCookieValue = (name) => (
    document.cookie.split('; ').find(row => row.startsWith(name + '='))
    ?.split('=')[1]
  );
  useEffect(() => {
    // 쿠키에서 사용자 닉네임을 가져와 상태에 설정
    const nickname = getCookieValue('nickname');
    console.log(nickname);
    if (!nickname || nickname === 'undefined') {
      console.error('User nickname is not found or undefined');
    } else {
      setCurrentUsername(nickname);
    }
    // 게시글 데이터 가져오기
    const headers = {
      'Authorization': `Bearer ${yourAuthToken}`  // 인증 헤더 설정
    };
    axios.get(`http://localhost:8000/post/post/${no}`, { headers })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setData(null); // In case of error, set data to null
      });
    // 댓글 데이터 가져오기
    axios.get(`http://localhost:8000/post/comment/`)
      .then(response => {
        const allComments = response.data;
        const commentsForPost = allComments.filter(c => parseInt(c.post) === parseInt(no));  // post ID가 no와 일치하는 댓글만 필터링
        setComments(commentsForPost);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        // In case of error, set data to null
      });
  }, [no, yourAuthToken]);

 
  const submitComment = () => {//댓글 쓰기
    const commentData = {
        comment: newComment,
        user: currentUsername,
        post: no,
        // 필요한 다른 데이터
    };
    axios.post(`http://localhost:8000/post/comment/`, commentData,{
      headers: {
        'Authorization': `Bearer ${yourAuthToken}`
      }
    })
    .then(response => {
      const updatedComments = Array.isArray(comments) ? [...comments, response.data] : [response.data];
      setComments(updatedComments);  // 댓글 목록 업데이트
      setNewComment('');  // 입력 필드 초기화
    })
    .catch(error => console.error("Error posting comment: ", error));
  };
  //댓글 삭제 함수
  const handleDeleteComment = (commentId) => {
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
  };
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // 게시물 날짜 형식 수정
  };
  // 게시물 삭제함수
  const deletePost = () => {
    if (window.confirm("정말 이 게시물을 삭제하시겠습니까?")) {
      const headers = {
        'Authorization': `Bearer ${yourAuthToken}`  // 인증 헤더 설정
      };
      axios.delete(`http://localhost:8000/post/post/${no}`, { headers })
        .then(() => {
          alert('게시물이 성공적으로 삭제되었습니다.');
          navigate('/post'); // 게시물 목록으로 이동
          setData(null);
        })
        .catch(error => {
          console.error('Error deleting post:', error.response ? error.response.data : error);
          alert('Failed to delete the post');
        });
    }
  };
  // '수정' 버튼 클릭 핸들러
  const enableEdit = () => {
    setIsEditing(true);  // 편집 모드 활성화
    setEditContent(data.body);  // 편집할 내용을 현재 게시물 내용으로 초기화
    setEditTitle(data.title);  // 편집할 제목을 현재 게시물 제목으로 초기화
  };
  // 게시물 수정 함수
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
          setData({...data, title: editTitle, body: editContent});  // UI를 업데이트된 데이터로 갱신
        })
        .catch(error => {
          console.error('Error updating post:', error.response ? error.response.data : error);
          alert('Failed to update the post');
        });
    }
    setIsEditing(false);  // 편집 모드 비활성화
  };



  return (
    <>
    <h2 align="center">게시글 상세정보</h2>
    <Wrapper>
      <Container className="post-view-wrapper">
        {
          data ? (
            <>
              <div className="post-view-row">
                <label>게시글 번호</label>
                <label>{data.id}</label>
              </div>
              <div className="post-view-row">
                <label>제목</label>
                {isEditing ? (
                  // 편집 모드인 경우
                  <StyledInput
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                  />
                ) : (
                  // 편집 모드가 아닌 경우, 기존 내용 보여줌
                  <label>{data.title}</label>
                )}
               
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{formatDate(data.created_at)}</label>
              </div>
              <div className="post-view-row">
                <label>작성자</label>
                <label>{data.user}</label>
              </div>
              <div className="post-view-row">
                <label>내용</label>
                {isEditing ? (
                  // 편집 모드인 경우
                  <StyledInput
                    type="text"
                    value={editContent}
                    onChange={(event) => setEditContent(event.target.value)}
                  />
                ) : (
                  // 편집 모드가 아닌 경우, 기존 내용 보여줌
                  <label>{data.body}</label>
                )}
              </div>
 
              <input
                  height={40}
                  value={newComment}
                  onChange={(event) => {
                      setNewComment(event.target.value);
                  }}
              />
              <Button title='댓글 작성' onClick={submitComment}  />

              <p><CommentList comments={Array.isArray(comments) ? comments : []} onDelete={handleDeleteComment} currentUser={currentUsername}/></p>
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
      </Container>
    </Wrapper>
    <Button title='뒤로' onClick={() => navigate(-1)} data={data}/>
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
    </>
   
  );
}
 
export default PostView;