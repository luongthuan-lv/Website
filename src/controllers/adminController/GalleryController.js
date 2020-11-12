const GalleryModel = require("../../models/gallerryModel")

let getGallery = async (req,res) =>{
    let item = {
        avatar: {
         
            image: "fdsfsd"
        }
    }
    let thai = await GalleryModel.createNew(item)
    console.log(thai)
}
module.exports = {
    getGallery: getGallery
}