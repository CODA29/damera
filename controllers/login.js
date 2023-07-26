module.exports =(req, res) =>{
    const error = req.query.error;
    res.render('login',{
        error
    })
}