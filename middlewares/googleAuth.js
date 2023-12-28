// googleAuth.js

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback', // Replace with your callback URL
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Check if the user already exists in your database
				let user = await User.findOne({
					googleId: profile.id,
				});

				if (!user) {
					// If the user doesn't exist, create a new user in your database
					user = new User({
						fullname: profile.displayName,
						email: profile.emails[0].value,
						// Other relevant user data
						googleId: profile.id, // Save Google ID to identify users
					});

					await user.save();
				}

				// Pass the user object to the done callback
				done(null, user);
			} catch (error) {
				done(error, null);
			}
		},
	),
);

// Serialize user into session
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});

export default passport;
