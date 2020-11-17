const Registererrors = {
    email_incorect: "Email phải có định dạng example@gmail.com",
    password_incorect: "Mật khẩu phải có ít nhất 8 kí tự, bao gồm chữ hoa, chữ thường",
    re_password_incorect: "Nhập lại mật khẩu chưa chính xác, bạn hãy nhập lại",
    gender_incorect: "Tại sao giới tính lại không nhập được? Trình duyệt bạn có vấn đề?",
    email_in_use: "Email này đã tồn tại trong một tài khoản khác !",
    account_removed: "Tài khoản này đã bị gỡ khỏi hệ thống của chúng tôi",
    account_not_active: "Tài khoản này đã được đăng kí nhưng chưa được ACTIVE, kiểm tra email của bạn"
}
const Registersuccess = {
    userCreated: (useremail) => {
        return `Tài khoản <strong>${useremail}</strong> đã đăng kí nhưng chưa kích hoạt, vui lòng kiểm tra email mà bạn đã đăng kí!`
    },
    account_actived: "Kích hoạt tài khoản thành công, Bạn có thể đăng nhập",
    logout_success: "Đăng xuất tài khoản thành công!"
}
const Registermailer = {
    subject: "NguyenDuyThai: Xác nhận thông tin tài khoản của bạn !",
    template: (linkVerify) => {
        return`
            <h2>Bạn nhận được Email này vì muốn đăng kí tài khoản quản trị.</h2>
            <h3>Vui lòng Click vào liên kết bên dưới để kích hoạt tài khoản:</h3>
            <h3><a href="${linkVerify}" target="blank" >${linkVerify}</a></h3>
            <h1>Xin chân thành cảm ơn!</h1>
        `
    },
    send_faild: "Có lối trong quá trình gửi email, vui lòng xem lại tất cả các thông tin!"

}
const transPassport = {
    server_error: "Có lỗi ở phía Server, Vui lòng đăng nhập hoặc trở lại sau, cảm ơn.",
    login_failed: "Tài khoản hoặc mật khẩu không chính xác, hãy kiểm tra lại!",
    account_not_active: "Tài khoản này đã được đăng kí nhưng chưa được ACTIVE, kiểm tra email của bạn",
    login_success: (username) => {
        return `Xin chào ${username}, Chúc bạn một ngày tốt lành!`
    }
}

///////////
const transUser = {
    deleteSuccess : "Xóa tài khoản thành công!",
    email_in_use: "Email này đã tồn tại trong một tài khoản khác !"
}
const transCategory = {
    deleteSuccess : "Xóa danh mục thành công!",
    cate_not_empty: "Không được thêm danh mục trống!",
    router_not_empty: "Không được thêm router trống!",
    cate_avatar_not_empty: "Avatar danh mục không được bỏ trống",
    avatar_type: "Định dạng ảnh bao gồm JPG-PNG-JPEG",
    createSuccess: "Tạo danh mục thành công"
}
const transLanguage = {
    deleteSuccess : "Xóa ngôn ngữ thành công!",
    lang_not_empty: "Không được thêm ngôn ngữ trống!",
    createSuccess: "Tạo ngôn ngữ thành công"
}
const transTour = {
    avatar_type: "Định dạng ảnh bao gồm JPG-PNG-JPEG",
    deleteSuccess : "Xóa tour thành công!",
    createSuccess: "Tạo tour thành công",
    router_not_empty: "Router còn để trống, làm ơn kiểm tra lại",
    place_not_empty: "Place còn để trống, làm ơn kiểm tra lại",
    lon_not_empty: "Longitude còn để trống, làm ơn kiểm tra lại",
    lat_not_empty: "Latitude còn để trống, làm ơn kiểm tra lại",
    info_not_empty: "Infomation còn để trống, làm ơn kiểm tra lại",
    tour_avatar_not_empty: "Avatar tour không được bỏ trống"
}
const transGallery = {
    avatar_type: "Định dạng ảnh bao gồm JPG-PNG-JPEG",
    deleteSuccess : "Xóa ảnh thành công!",
    createSuccess: "Tạo ảnh thành công",
    tour_avatar_not_empty: "Avatar tour không được bỏ trống"
}
module.exports = {
    Registererrors: Registererrors,
    Registersuccess: Registersuccess,
    Registermailer: Registermailer,
    transPassport:transPassport,
    transUser:transUser,
    transCategory: transCategory,
    transLanguage: transLanguage,
    transTour: transTour,
    transGallery:transGallery
}