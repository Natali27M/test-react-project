import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hook';
import { getAllComments } from '../../store';
import { Comment } from '../../components'
import css from './Comments.module.css'

const Comments: FC<{ postId: any, userId: number }> = (
    { postId, userId }
) => {

    const { comments, status } = useAppSelector(state => state.comments);

    const commentsByPost = comments.filter(comment => comment.postId === postId);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllComments())
    }, []);

    return (
        <div>
            { status === 'fulfilled' ?

                <div className={css.comments}>
                        { commentsByPost.map(comment =>
                            <Comment key={ comment.id } comment={ comment } id={ userId }/>)
                        }
                </div>

                 :

                <div>
                    Loading
                </div>
            }
        </div>
    );
};

export { Comments };
