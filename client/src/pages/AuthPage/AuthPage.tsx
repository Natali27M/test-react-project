import React from 'react';

import css from './AuthPage.module.css';
import { AuthForm } from '../../components';

const AuthPage = () => (
    <div className={ css.authWrap }>
        <div className={ css.authContainer }>
            <AuthForm />
        </div>
    </div>
);

export { AuthPage };
