import {
    Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

import { Post } from './post';
import { Comment } from './comment';
import { IUser } from '../interfaces';
import { CommonFields } from './commonFields';
import { config } from '../configs';

@Entity('Users', { database: config.DB_NAME })
export class User extends CommonFields implements IUser {
    @PrimaryGeneratedColumn()

        id: number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        name: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        surname: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        password: string;

    @Column({
        nullable: false,
        default: Date.now(),
    })

    @CreateDateColumn({ type: 'timestamp' })
        createdAt: string;

    @Column()
    @DeleteDateColumn({ type: 'timestamp' })
        deletedAt?: string;

    @OneToMany(() => Post, (post) => post.user)
        posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
        comments: Comment[];
}
