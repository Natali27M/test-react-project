import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hook";
import {getAllPosts} from "../../store";
import {Post} from "../../components";
import css from './PostPage.module.css';

const PostsPage: FC = () => {
    const {posts, status} = useAppSelector(state => state.posts);
    const {users} = useAppSelector(state => state.users);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllPosts())
    }, []);

    return (
        <div>
            {status === "fulfilled" ?
                <div>

                    <div className={css.posts}>
                        {posts.map(post => <Post key={post.id} post={post} users={users}/>)}
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
