const LangModel = require("./../../models/languageModel")
const { transLanguage } = require("./../../../lang/vi")
let getLanguage = async (req, res) => {
    const Lang = await LangModel.listAll()
    lang = JSON.parse(JSON.stringify(Lang))
    return res.render('admin/languagee/language', {
        success: req.flash("success"),
        errors: req.flash("errors"),
        data: { lang: lang }
    })
}
let getRemoveLanguage = async (req, res) => {
    const id = req.params.id
    await LangModel.removeById({ _id: id })
    req.flash("success", transLanguage.deleteSuccess)
    res.redirect('/language')

}
let getAddLanguage = (req, res) => {
    return res.render("admin/languagee/add_language", {
        success: req.flash("success"),
        errors: req.flash("errors")
    })
}
let postAddLanguage = async (req, res) => {
    if (req.body.lang_name == "") {
        req.flash("errors", transLanguage.lang_not_empty)
        res.redirect('/language/add')
    } else {
        let item = {
            lang_name: req.body.lang_name
        }
        await LangModel.createNew(item)
        req.flash("success", transLanguage.createSuccess)
        res.redirect('/language')

    }
}
let getEditLanguage = async (req,res) => {
    let id = req.params.id
    let item = await LangModel.findById({_id: id})
    item = JSON.parse(JSON.stringify(item))

    return res.render('admin/languagee/edit', {
        success: req.flash("success"),
        errors: req.flash("errors"),
        item: item
    })
}
let postEditLanguage = async (req,res) => {
    let id = req.params.id
    let item = {
        lang_name: req.body.lang_name
    }
    await LangModel.findByIdAndUpdate(id, item)
    req.flash("success", "Edit Success")
    res.redirect('/language')
}
module.exports = {
    getLanguage: getLanguage,
    getRemoveLanguage: getRemoveLanguage,
    getAddLanguage: getAddLanguage,
    postAddLanguage: postAddLanguage,
    getEditLanguage: getEditLanguage,
    postEditLanguage: postEditLanguage
}