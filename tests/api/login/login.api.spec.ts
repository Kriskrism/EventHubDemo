import { test, expect } from '@playwright/test';
import { LoginService } from '../../../services/login/login';
import { credentials } from '../../../resources/config/env';

let invalidPassword, invalidEmail,token;
const userName = credentials.username;
const password = credentials.password;

test('Login API test using valid credentials', async () => {

    const payLoad = {
        "email": userName,
        "password": password
    };
    const response = await LoginService.login(payLoad);

    const body = await response.json();
    expect(await response.status()).toBe(200);
    expect(body).toHaveProperty('token');

    token = body.token;
})

test('Login using invalid credentials', async () => {

    invalidPassword = credentials.invalidPassword;

    const payLoad = {
        "email": userName,
        "password": invalidPassword
    };

    const response = await LoginService.login(payLoad);

    const body = await response.json();
    expect(await response.status()).toBe(400);
    expect(body.error).toBe('Invalid email or password');


})

test('Login using invalid email', async () => {
    invalidEmail = credentials.invalidEmail;

    const payLoad = {
        "email": invalidEmail,
        "password": password
    }

    const response = await LoginService.login(payLoad);
    const body = await response.json();
    expect(await response.status()).toBe(400)
    expect(await body.error).toBe('Invalid email or password');
})