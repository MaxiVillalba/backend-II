import passport from "passport";
import 'dotenv/config';
import GithubStrategy from 'passport-github2';
import { userModel } from "../models/user.models.js";

export const initializePassport = () => {
    // "github" registra una estrategia de autenticacion llamada github
    passport.use("github", new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:1989/api/sessions/githubcallback"
    },
    async (access_token, refresh_token, profile, done) => {
        try {
            console.log(profile);
            const email = profile.emails?.[0].value || 'Correo no disponible';

            let user = await userModel.findOne({
                email
            });

            if (user) {
                return done(null, user);
            }

            const newUser = await userModel.create({
                name: profile.displayName,
                email,
                age: profile.age || 0,
                githubId: profile.id
            });

            return done(null, newUser);

        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            return done(null, user);
        } catch (error) {
            return done(`Ha ocurrido un error: ${error.message}`);
        }
    });
};
