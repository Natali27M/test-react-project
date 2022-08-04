import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { createComment } from '../../store';
import { Comments } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hook';

const CommentsPage = () => {
    const location = useLocation();

    const { user } = useAppSelector((state) => state.auth);

    const {
        handleSubmit, register, reset,
    } = useForm();

    const dispatch = useAppDispatch();

    const submit = (comment: any) => {
        comment = {
            userId: user?.id,
            postId: location.state,
            description: comment.description
        };
        dispatch(createComment(comment));
        reset();
    };


    return (
        <div>

            <form onSubmit={ handleSubmit(submit) }>

                <label htmlFor='title'>Comment :
                    <input id='title' type='text' {...register('description')} />
                </label>


                <button type='submit'>Publish</button>

            </form>

            <Comments postId={ location.state }/>

        </div>
    );
};

export {CommentsPage};
