let getDashboard = (req,res) => {
    return res.render('admin/dashboard/dashboard', {
        success: req.flash("success")
    })
}
module.exports = {
    getDashboard: getDashboard
}