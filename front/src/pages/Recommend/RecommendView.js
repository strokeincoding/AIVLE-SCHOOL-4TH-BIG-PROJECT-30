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
  const [occupations, setOccupations] = useState({});
  const [technologyStacks, setTechnologyStacks] = useState({});
  const [comment, setComment] = useState('');

  const { no } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 기술 스택 데이터 가져오기
    axios.get('http://127.0.0.1:8000/user/TechnologyStack/')
      .then(response => {
        const stackMap = response.data.reduce((map, stack) => {
          map[stack.id] = stack.stack_name;
          return map;
        }, {});
        setTechnologyStacks(stackMap);
      })
      .catch(error => console.error("Error fetching technology stacks: ", error));
  }, []); // 빈 의존성 배열 추가

  useEffect(() => {
    // 직업 목록 가져오기
    axios.get('http://127.0.0.1:8000/user/Occupation/')
      .then(response => {
        const occupationMap = response.data.reduce((map, occupation) => {
          map[occupation.id] = occupation.occupation_name;
          return map;
        }, {});
        setOccupations(occupationMap);
      })
      .catch(error => console.error("Error fetching occupations: ", error));

    // 게시물 데이터 가져오기
    axios.get(`http://localhost:8000/recommend/Recommend/${no}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setData(null);
      });
  }, [no]);

  const deletePost = () => {
    if (window.confirm("Do you really want to delete this post?")) {
      axios.delete(`http://localhost:8000/recommend/Recommend/${no}`)
        .then(() => {
          alert('Post deleted successfully');
          navigate('/recommend');
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
                <label>카테고리</label>
                <label>{data.cate}</label>
              </div>
              <div className="post-view-row">
                <label>작성자</label>
                <label>{data.user}</label>
              </div>
              <div className="post-view-row">
                <label>필요기술</label>
                <div>{data && data.technology_stacks.map(id => technologyStacks[id]).join(', ')}</div>
              </div>
              <div className="post-view-row">
                <label>프로젝트설명</label>
                <div>{data.Project_Description}</div>
              </div>
              <div className="post-view-row">
                <label>근무환경</label>
                <div>{data.env}</div>
              </div>
              <div className="post-view-row">
                <label>역할 및 책임</label>
                <div>{data && data.occupation.map(id => occupations[id]).join(', ')}</div>
              </div>
              <div className="post-view-row">
                <label>경력</label>
                <div>{data.Exp_require}</div>
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