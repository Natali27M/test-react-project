import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import css from './AuthForm.module.css';
import { IUser } from '../../interfaces';
import { Constants } from '../../configs';
import { useAppDispatch, useAppSelector } from '../../hook';
import { authService } from '../../services';
import { createNewUser, loginNewUser } from '../../store';

const AuthForm = () => {
    const {
        handleSubmit,
        register,
        getValues,
    } = useForm<IUser>();

    const { auth } = Constants;
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState<string>(auth.guest);

    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const checkUserStatus = async (): Promise<void> => {
        const email = getValues('email');
        try {
            await authService.getUserByEmail(email);
            setUserStatus(auth.isLogin);
        } catch (e) {
            setUserStatus(auth.isSignUp);
        }
    };

    const enter = (data: IUser): void => {
        if (userStatus === auth.isSignUp) {
            dispatch(createNewUser(data));
            if (user) navigate('/', { replace: true });
        } else if (userStatus === auth.isLogin) {
            dispatch(loginNewUser(data));
            if (user) navigate('/', { replace: true });
        } else {
            checkUserStatus();
        }
    };

    return (
        <div className={css.authFormBlock}>
            <h3>Вхід/Реєстрація</h3>
            <div className={css.authForm}>
                <form onSubmit={handleSubmit(enter)}>
                    <label htmlFor="email">
                        e-mail <span>*</span>
                        <input
                            type="email"
                            id="email"
                            placeholder="olyasluva@gmail.com"
                            {...register('email', {
                                onChange: () => {
                                    if (userStatus !== auth.guest) {
                                        setUserStatus(auth.guest);
                                    }
                                },
                            })}
                        />
                    </label>
                    {userStatus === auth.isSignUp ? (
                        <div className={css.signUp}>
                            <p>Ооооо you is new user</p>
                            <label htmlFor="name">
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                Name
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Name"
                                    {...register('name')}
                                />
                            </label>
                            <label htmlFor="surname">
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                Surname
                                <input
                                    type="text"
                                    id="surname"
                                    placeholder="Surname"
                                    {...register('surname')}
                                />
                            </label>
                            <label htmlFor="password">
                                Пароль
                                <input
                                    autoComplete="dadawd"
                                    type="password"
                                    id="password"
                                    {...register('password')}
                                />
                            </label>
                        </div>
                    ) : userStatus === auth.isLogin ? (
                        <div>
                            <label htmlFor="password">
                                Пароль
                                <input
                                    autoComplete="dadawd"
                                    type="password"
                                    id="password"
                                    {...register('password')}
                                />
                            </label>
                        </div>
                    ) : null}
                    <button type="submit">
                        {
                            userStatus === auth.isSignUp
                                ? 'Зареєструватись'
                                : userStatus === auth.isLogin
                                    ? 'Увійти' : 'Далі'
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export { AuthForm };
