// config/passport.js

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';

passport.use(
	new GoogleStrategy(
		{
			clientID:
				'979909461173-kglbttqpfn7ho49d7a3umdg7mon0m162.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: '/oauth2/redirect/google',
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const existingUser = await User.findOne({
					googleId: profile.id,
				});

				if (existingUser) {
					return done(null, existingUser);
				}

				const newUser = await User.create({
					googleId: profile.id,
					name: profile.displayName,
					// Add other fields as needed
				});

				done(null, newUser);
			} catch (error) {
				done(error, null);
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});

export default passport;
