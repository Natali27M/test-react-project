import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

import {IPost, IUser} from '../../interfaces';
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
    }, [dispatch]);

    return (
    <div className={css.post}>
        {
            !user
                ? (
                    <Link to='/login' className={ css.link }>
                             <Card className={css.user}>
                                 <Card.Body>
                                     <Card.Title className={css.user}>
                                         <div className={ css.name }>{ name }</div>
                                         <div className={ css.name }>{ surname }</div>
                                     </Card.Title>
                                     <Card.Subtitle className={ css.title }>{ title }</Card.Subtitle>
                                     <Card.Text className={ css.description }>{ description }</Card.Text>
                                     <div className={ css.title }>Comments : { numberComments }</div>
                                 </Card.Body>
                             </Card>
                    </Link>
                )

                :

                (
                    <Link to='/comments' state={ id } className={ css.link }>

                        <Card className={css.user}>
                            <Card.Body>
                                <Card.Title className={css.user}>
                                    <div className={ css.name }>{ name }</div>
                                    <div className={ css.name }>{ surname }</div>
                                </Card.Title>
                                <Card.Subtitle className={ css.title }>{ title }</Card.Subtitle>
                                <Card.Text className={ css.description }>{ description }</Card.Text>
                                <div className={ css.title }>Comments : { numberComments }</div>
                            </Card.Body>
                        </Card>
                    </Link>
                )
        }
    </div>
)
};

export { Post };
