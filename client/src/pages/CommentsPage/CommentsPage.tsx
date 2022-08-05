import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { createComment } from '../../store';
import { Comments } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hook';
import css from './CommentsPage.module.css';

const CommentsPage = () => {
    const location = useLocation();
    const { user } = useAppSelector((state) => state.auth);
    const userId = user?.id as number;

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

            <div className={ css.header }>
                Comments
            </div>

            <div className={ css.hr }></div>

            <div className={css.commentsPage}>

                    <form onSubmit={ handleSubmit(submit) }  className={css.formComment}>

                        <label htmlFor='title'>Your comment :
                            <input id='title' type='text' {...register('description')} className={css.input}/>
                        </label>


                        <button type='submit'>Publish</button>

                    </form>

                <Comments postId={ location.state } userId={ userId }/>

            </div>

            <div className={ css.hr }></div>

            <div className={ css.header }></div>

        </div>
    );
};

export {CommentsPage};
