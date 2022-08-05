import React, {FC, useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

import { IComment } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getAllUsers } from '../../store';
import css from './Comment.module.css'

const Comment: FC<{ comment: IComment , id: number }>  = (
    {
        comment: {
            userId,
            description
        },
    }) => {
    const { users } = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllUsers())
    }, []);
    const user = users.find(user => user.id === userId);
    const name = user?.name as string;
    const surname = user?.surname as string;

    return (
        <div className={css.comments}>
            <Accordion defaultActiveKey={['0']} alwaysOpen className={css.accordion}>
                <Accordion.Item eventKey="0"  className={css.oneComment}>
                    <Accordion.Header className={css.item}><p>Comment by { name }    { surname } </p></Accordion.Header>
                    <Accordion.Body className={css.description}>
                        { description }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export { Comment };
