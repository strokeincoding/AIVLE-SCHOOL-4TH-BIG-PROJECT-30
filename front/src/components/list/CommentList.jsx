import React from 'react';
import styled from 'styled-components';

 
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
 
    :not(:last-child) {
        margin-bottom: 16px;
    }
`;
 
function CommentList(props) {
    const { comments } = props;
 
    // Ensure comments is always an array
    const safeComments = comments || [];
 
    return (
<Wrapper>
            {safeComments.map((comment, index) => {
                return (
<div key={comment.id}>
                        {/* Render individual comment items */}
<p>{comment.user}: {comment.comment}</p>
</div>
                );
            })}
</Wrapper>
    );
}
 
export default CommentList;