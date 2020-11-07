# NodeJS-Website
NodeJs-Website

        // kiem tra email
        const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        // kiem tra theo so dien thoại viet nam
        const ph = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
        // kiem tra password
        const pa = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
        // kiem tra khong duoc viet co dau
        const da = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g
        //kiểm tra khong chua ki tu dac biet
        const t = /[$&+,:;=?@#|]/
        // kiem tra khong duoc chua ki tu trang
        const ktt = /\S/