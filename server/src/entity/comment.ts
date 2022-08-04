import {
    Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';
import { Post } from './post';
import { IComment } from '../interfaces';
import { config } from '../configs';

@Entity('Comments', { database: config.DB_NAME })
export class Comment extends CommonFields implements IComment {
    @PrimaryGeneratedColumn()

        id: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        postId: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        description: string;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'userId' })
        user: User;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post: Post;
}
