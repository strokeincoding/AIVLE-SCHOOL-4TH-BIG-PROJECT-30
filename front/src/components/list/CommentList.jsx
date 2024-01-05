import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  :not(:last-child) {
    margin-bottom: 16px;
  }

  &:hover {
    background-color: #ececec;
  }
`;

const CommentText = styled.span`
  margin: 0;
  font-size: 16px;
  margin-right: 5px;
  color: #333;
`;

const CommentUser = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;
const CommentItem = styled.div`
  display: flex;
  justify-content: space-between; /* 텍스트와 삭제 아이콘을 양 끝으로 분리 */
  align-items: center; /* 세로 중앙 정렬 */
  width: 100%; /* 필요하다면 전체 너비를 사용 */
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column; /* 내용을 세로로 쌓기 위해 */
  flex-grow: 1;
  margin-right: 10px; /* 삭제 아이콘과의 간격을 위해 */
`;

function CommentList(props) {
  const { comments, onDelete, currentUser } = props;

  // Ensure comments is always an array
  const safeComments = comments || [];
  if (safeComments.length === 0) {
    return null;
  }
  return (
    <Wrapper>
      {safeComments.map((comment) => (
        <CommentItem key={comment.id}>
          <CommentContent>
          
            <CommentUser>{comment.user}</CommentUser> 
            <CommentText>{comment.comment} </CommentText>
            </CommentContent>
            {currentUser === comment.user && (
              <div>
              <DeleteIcon onClick={() => onDelete(comment.id)} style={{cursor: 'pointer'}}/>
              </div>
            )}
        </CommentItem>
      ))}
    </Wrapper>
  );
}

export default CommentList;