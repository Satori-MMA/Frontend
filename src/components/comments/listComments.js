import { useEffect, useState } from "react";
import { Form, Row, Col, Container,Button } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import ALL_REVIEW from "../../graphql/comments/ALL_COMMENTS";
import CommentCard from "./commentCard";

export const ListComment = ({idLesson}) => {
    const [allReviews, { data, loading }] = useLazyQuery(ALL_REVIEW, {
        fetchPolicy: "network-only",
      });
      useEffect(() => {
        allReviews({ variables: { lessonId: idLesson } });
        
      }, []);
     
    return <div>
      {data?.allReviews?.edges?.map(({ node }) => (
            <CommentCard
            opQualification={node.opQualification}
            opComment={node.opComment}
            email = {node.user.email}
            
            />
            // renderCard(node)
            
            ))}
    </div>
};
export default ListComment;