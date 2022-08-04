import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hook';
import { Post} from '../../components';
import { getAllPosts, setPage } from '../../store';
import css from './PostPage.module.css';

const PostsPage: FC = () => {
    const { posts, status, data } = useAppSelector(state => state.posts);
    const { users } = useAppSelector(state => state.users);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllPosts({ page: data.page }))
    }, [data.page, dispatch]);

    const firstPage = () => {
        dispatch(setPage({ page: 1 }));

    };

    const nextPage = () => {
        if (data.page <= 50) {
            dispatch(setPage({ page: data.page + 1 }));
        }
    };

    const lastPage = () => {
        dispatch(setPage({ page: 50 }));

    };

    return (
        <div>
            { status === 'fulfilled' ?
                <div>

                    <div className={ css.posts }>
                        { posts.map(post => <Post key={ post.id } post={ post } users={ users }/>) }
                    </div>

                    <div className={ css.buttons }>
                        <button className={ css.button } disabled={ data.page - 1 < 1 } onClick={ ()=>firstPage() }>
                            First page
                        </button>

                        <div>{ data.page }</div>

                        <button className={ css.button } disabled={ data.page + 1 >= 50 } onClick={ () => nextPage() }>
                            Next page
                        </button>

                        <button className={ css.button } disabled={ data.page >= 50 } onClick={ () => lastPage() }>
                            Last page
                        </button>
                    </div>

                </div> :
                <div>
                    Loading
                </div>
            }
        </div>
    );
};

export { PostsPage };
