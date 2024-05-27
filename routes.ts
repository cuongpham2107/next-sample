/**
* Một loạt các tuyến đường có thể truy cập được cho công chúng
* Có các tuyến không yêu cầu xác thực
* @type {string[]}
*/

export const publicRoutes = [
    "/"
];

/**
* Một loạt các tuyến đường được sử dụng để xác thực
* Có các tuyến sẽ chuyển hướng đăng nhập vào người dùng / cài đặt
* @type {string[]}
*/
export const authRoutes = [
    "/login",
    "/register",
];

/**
* Tiền tố cho các tuyến xác thực API
* Các tuyến bắt đầu với tiền tố này được sử dụng cho API
* @type {String}
*/
export const apiAuthRoutes = "/api/auth";

/**
* Đường dẫn chuyển hướng mặc định sau khi đăng nhập
* @type {string}
*/
export const DEFAULT_LOGIN_ADMIN_REDIRECT = "/admin/settings";


export const DEFAULT_LOGIN_REDIRECT = "/";