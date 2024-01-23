import { useRef, useEffect } from "react";
import api from '../../api/axiosConfig'
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

import React from 'react';

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const imdbId = params.imdbId;

    console.log(reviews)

    useEffect(() => {
        getMovieData(imdbId);
    }, [])

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;
        
        try {
            const response = await api.post("/api/v1/reviews/", {reviewBody:rev.value, imdbId:imdbId});
            const updatedReviews = [...reviews, {body:rev.value}];
            rev.value = "";
            setReviews(updatedReviews)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Reviews</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img src={movie?.poster} alt=""/>
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r) => {
                            return (
                                <>
                                    <Row>
                                        <Col>
                                            {r.body}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews;