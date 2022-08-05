import React, { FC, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination'
import 'bootstrap/dist/css/bootstrap.min.css';

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

    const prevPage = () => {
        if (data.page <= 50) {
            dispatch(setPage({page: data.page - 1}));
        }
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

                    <div className={ css.hr }></div>

                    <div className={ css.buttons }>

                        <Pagination className={ css.pagination }>
                            <Pagination.First disabled={ data.page - 1 < 1 } onClick={ ()=>firstPage() } className={ css.text }/>

                            <Pagination.Prev disabled={data.page - 1 < 1} onClick={() => prevPage()}className={ css.text }/>
                            <Pagination.Item disabled={ data.page - 1 < 1 }
                                             onClick={ ()=>firstPage() }
                                             className={ css.text }>
                                First Page
                            </Pagination.Item>
                            <Pagination.Ellipsis />

                            <Pagination.Item  active className={css.active}>{data.page}</Pagination.Item>

                            <Pagination.Ellipsis />
                            <Pagination.Item disabled={ data.page + 1 >= 50 } onClick={ () => nextPage() } className={ css.text }>
                                Next page
                            </Pagination.Item>

                            <Pagination.Item disabled={ data.page >= 50 } onClick={ () => lastPage() } className={ css.text }>
                                Last page
                            </Pagination.Item>

                            <Pagination.Next disabled={ data.page + 1 >= 50 } onClick={ () => nextPage() } className={ css.text }/>
                            <Pagination.Last disabled={ data.page >= 50 } onClick={ () => lastPage() } className={ css.text }/>
                        </Pagination>


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
