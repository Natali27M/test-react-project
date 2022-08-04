import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { IPost, IUser } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getAllComments, getAllUsers } from '../../store';
import css from './Post.module.css';

const Post: FC<{ post: IPost, users: IUser[]}> = (
    {
        post:
            {
                id,
                userId,
                title,
                description
            }
    }) => {

    const { users } = useAppSelector(state => state.users);
    const { user } = useAppSelector((state) => state.auth);
    const { comments } = useAppSelector(state => state.comments);
    const myUser = users.find(user => user.id === userId);
    const commentsByPost = comments.filter(comment => comment.postId === id);
    const numberComments = commentsByPost.length;
    const name = myUser?.name;
    const surname = myUser?.surname;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllComments())
    }, []);

    return (
        <div className={css.post}>
            {
                !user
                    ? (
                        <Link to='/login' className={ css.link }>
                            <div className={ css.user }>
                                <div className={ css.name }>{ name }</div>
                                <div className={ css.name }>{ surname }</div>
                            </div>

                            <div className={ css.title }>{ title }</div>

                            <div className={ css.description }>{ description }</div>

                            <div>Comments : { numberComments }</div>
                        </Link>
                    )

                    :

                    (
                        <Link to='/comments' state={ id } className={ css.link }>

                            <div className={ css.user }>
                                <div className={ css.name }>{ name }</div>
                                <div className={ css.name }>{ surname }</div>
                            </div>

                            <div className={ css.title }>{ title }</div>

                            <div className={ css.description }>{ description }</div>

                            <div>Comments : { numberComments }</div>
                        </Link>
                    )
            }
        </div>
    );
};

export { Post };
