import { ONG } from '../models/ONG';
import { Voluntario } from '../models/Voluntario';
import jwtDecode from './JWTHelper';

export enum RoleEnum {
    ONG,
    Volunteer,
}

export interface JWTToken {
    token: string;
    expiresAt: string;
}

export class AuthHelper {
    static getToken(): string {
        const token = localStorage.getItem('token');

        if (token === null || token.length === 0)
            throw new Error('Empty token');

        const jwtToken: JWTToken = JSON.parse(token);

        return jwtToken.token;
    }

    static saveToken(jwtString: string): JWTToken {
        const token = localStorage.getItem('token');

        if (token === null || token.length === 0)
            localStorage.setItem('token', JSON.stringify(jwtString));

        const result = JSON.parse(JSON.stringify(jwtString));

        return result;
    }

    static isExpired(): boolean {
        const token = localStorage.getItem('token');

        if (token === null || token.length === 0)
            throw new Error('Empty token');

        const parsedToken: JWTToken = JSON.parse(token);

        const currentTime = new Date();
        const expiresAt = new Date(Date.parse(parsedToken.expiresAt));

        const isExpired = expiresAt < currentTime;

        return isExpired;
    }

    static parseJwtToRole(
        role: RoleEnum,
        jwtToken: JWTToken
    ): ONG | Voluntario {
        const token = jwtToken.token;
        const decodedToken = jwtDecode(token);

        switch (role) {
            case RoleEnum.ONG: {
                const ong: ONG = decodedToken;

                return ong;
            }

            case RoleEnum.Volunteer: {
                const volunteer: Voluntario = decodedToken;

                return volunteer;
            }
            default:
                throw new Error('Invalid role');
        }
    }

    static sendToken(token: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        return config;
    }

    static logout() {
        localStorage.clear();
    }
}
