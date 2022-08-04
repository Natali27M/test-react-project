import React, { FC } from 'react';

import { IComment } from '../../interfaces';
import css from './Comment.module.css'

const Comment: FC<{ comment: IComment }>  = (
    {
        comment: {
            description
        }
    }) => {

    return (
        <div className={ css.comment }>
            { description }
        </div>
    );
};

export { Comment };
