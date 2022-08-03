import React, { FC, useEffect } from "react";

import { IPost, IUser } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../hook";
import { getAllUsers } from "../../store";
import css from './Post.module.css';
import {Link, NavLink} from "react-router-dom";

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
    const {users} = useAppSelector(state => state.users);
    const { user } = useAppSelector((state) => state.auth);
    const myUser = users.find(user => user.id === userId)

    const name = myUser?.name
    const surname = myUser?.surname

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllUsers())
    }, []);

    return (
        <div className={css.post}>
            {
                !user
                    ? (
                        <Link to="/login" className={css.link}>
                            <div className={css.user}>
                                <div className={css.name}>{name}</div>
                                <div className={css.name}>{surname}</div>
                            </div>
                            <div className={css.title}>{title}</div>
                            <div className={css.description}>{description}</div>
                        </Link>
                    )
                    : (
                        <Link to="/comments" state={id} className={css.link}>
                            <div className={css.user}>
                                <div className={css.name}>{name}</div>
                                <div className={css.name}>{surname}</div>
                            </div>
                            <div className={css.title}>{title}</div>
                            <div className={css.description}>{description}</div>
                        </Link>
                    )
            }
        </div>
    );
};

export {Post};
