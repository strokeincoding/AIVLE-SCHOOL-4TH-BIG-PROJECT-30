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

const CommentText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const CommentUser = styled.span`
  font-weight: bold;
  margin-right: 5px;
  color: #007bff;
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
        <div key={comment.id}>
          {/* Render individual comment items */}
          <CommentText>
            <CommentUser>{comment.user}:</CommentUser> {comment.comment} 
            {currentUser === comment.user && (
              <DeleteIcon onClick={() => onDelete(comment.id)} style={{cursor: 'pointer'}}/>
            )}
          </CommentText>
        </div>
      ))}
    </Wrapper>
  );
}

export default CommentList;