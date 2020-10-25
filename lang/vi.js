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
    account_actived: "Kích hoạt tài khoản thành công, Bạn có thể đăng nhập"
}
module.exports = {
    Registererrors: Registererrors,
    Registersuccess: Registersuccess
}