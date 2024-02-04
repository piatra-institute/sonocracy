import express from 'express';
import cookieParser from 'cookie-parser';

import {
    getUser,
    logout,
    googleLogin,
    checkoutSessions,
    getVenues,
    venueRegister,
    venueVoteVolume,
    venueBidSong,
} from './handlers';

import voter from './logic/Voter';



const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.all('*', (req, res, next) => {
    const origin = req.get('origin');

    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

    next();
});

app.post('/get-user', getUser);
app.post('/logout', logout);
app.post('/google-login', googleLogin);
app.post('/stripe-checkout-sessions', checkoutSessions);
app.post('/get-venues', getVenues);
app.post('/venue-register', venueRegister);
app.post('/venue-vote-volume', venueVoteVolume);
app.post('/venue-bid-song', venueBidSong);

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});


voter.vote();
