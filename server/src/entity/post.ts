import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';
import { Comment } from './comment';
import { IPost } from '../interfaces';
import { config } from '../configs';

@Entity('Posts', { database: config.DB_NAME })
export class Post extends CommonFields implements IPost {
    @PrimaryGeneratedColumn()

        id: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 1000,
        nullable: false,
    })
        description: string;

    @OneToMany(() => Comment, (comment) => comment.post)
        comments: Comment[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: User;
}
