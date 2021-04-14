const production = (app, port) => {
    app.enable('trust proxy');

    app.use((req, res, next) => {
        if (req.secure) {
            // console.log('secure');
            next();
        } else {
            res.redirect('https://' + req.headers.host + req.url);
        }
        // next();
    });

    app.listen(3000);
};

export default production;