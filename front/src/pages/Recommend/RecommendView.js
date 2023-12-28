import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';
import Button from '../../pages/ui/Button';
import CommentList from '../../components/list/CommentList';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;
const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;


const RecommendView = ({ history, match }) => {
  const [data, setData] = useState(null);

  const { no } = useParams();
  

  
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`http://localhost:8000/recommend/recommend/${no}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setData(null); // In case of error, set data to null
      });
  }, [no]); 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats the date to 'YYYY-MM-DD'
  };

   const deletePost = () => {
    if (window.confirm("Do you really want to delete this post?")) {
      axios.delete(`http://localhost:8000/recommend/recommend/${no}`)
        .then(() => {
          alert('Post deleted successfully');
          navigate('/recommend'); // Navigate to home or post list page
        })
        .catch(error => {
          console.error('Error deleting post:', error.response ? error.response.data : error);
          alert('Failed to delete the post');
        });
    }
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
                <label>{data.title}</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{formatDate(data.created_at)}</label>
              </div>
              <div className="post-view-row">
                <label>카테고리</label>
                <label>{data.categories}</label>
              </div>
              <div className="post-view-row">
                <label>작성자</label>
                <label>{data.user}</label>
              </div>
              <div className="post-view-row">
                <label>필요기술</label>
                <div>{data.required}</div>
              </div>
              <div className="post-view-row">
                <label>프로젝트설명</label>
                <div>{data.project}</div>
              </div>
              <div className="post-view-row">
                <label>근무환경</label>
                <div>{data.work}</div>
              </div>
              <div className="post-view-row">
                <label>역할 및 책임</label>
                <div>{data.roles}</div>
              </div>
              <div className="post-view-row">
                <label>경력</label>
                <div>{data.experience}</div>
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
              <Button title='댓글 작성하기' onClick={submitComment} />
            </>
          ) : '해당 게시글을 찾을 수 없습니다.'
        }
      </Container>
    </Wrapper>
    <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>목록으로 돌아가기</button>
    <Button title='Delete Post' onClick={deletePost} />
    </>
    
  );
}

export default RecommendView;