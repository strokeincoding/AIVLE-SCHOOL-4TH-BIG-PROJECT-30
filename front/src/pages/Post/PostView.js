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
 
/* Comment Label */
const CommentLabel = styled.p`
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
`;
 
/* Buttons */
const StyledButton = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
 
    &:hover {
        background-color: #0056b3;
    }
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
  }, [no, yourAuthToken]);
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats the date to 'YYYY-MM-DD'
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
 
  const submitComment = () => {
    console.log("Submitting comment:", comment);
    setComment('');
  };
 
 
  const [comment, setComment] = useState('');
 
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
 
              <CommentLabel>댓글</CommentLabel>
              <CommentList comments={data ? data.comment : []} />
 
              <input
                  height={40}
                  value={comment}
                  onChange={(event) => {
                      setComment(event.target.value);
                  }}
              />
              <button title='댓글' onClick={submitComment} data={data} />
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
      </Container>
    </Wrapper>
    <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
    {data && currentUsername === data.user && (
      <>
        {!isEditing && (
          <StyledButton onClick={enableEdit}>수정</StyledButton>
        )}
       
        {isEditing && (
          <StyledButton onClick={confirmEdit}>수정 완료</StyledButton>
        )}
        <Button title='삭제' onClick={deletePost} data={data}/>
      </>
    )}
    </>
   
  );
}
 
export default PostView;