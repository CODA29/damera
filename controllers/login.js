module.exports =(req, res) =>{
    const error = req.query.error;
    if(req.session.userId){
        return res.render('create')
    }res.render('login',{
        error
    })
}