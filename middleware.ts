import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import { 
    DEFAULT_LOGIN_ADMIN_REDIRECT,
    DEFAULT_LOGIN_REDIRECT,
    apiAuthRoutes,
    authRoutes,
    publicRoutes,
 } from "@/routes";
const {auth} = NextAuth(authConfig);

export default auth((req) => {
    const nextURL = new URL(req.url);
    const isLogged = !!req.auth;

    const isApiAuthRoute = nextURL.pathname.startsWith(apiAuthRoutes);
    const isPublicRoute = publicRoutes.includes(nextURL.pathname);
    const isAuthRoute = authRoutes.includes(nextURL.pathname);

    // Nếu đường dẫn là một tuyến đường API xác thực, không cần xác thực
    if (isApiAuthRoute) {
        return undefined;
    }

    // Nếu đường dẫn là một tuyến đường xác thực đăng nhâp, không cần xác thực
    if (isAuthRoute) {
        // Nếu người dùng đã đăng nhập, chuyển hướng đến trang mặc định
        if (isLogged) {
            return Response.redirect(new URL(DEFAULT_LOGIN_ADMIN_REDIRECT, nextURL));
        }
        return undefined;
    }
    // Nếu đường đẫn không là một tuyến đường công khai và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập 
    if (!isLogged && !isPublicRoute) {
        return Response.redirect(new URL("/login", nextURL));
    }
    return undefined;
});

// Tùy chọn, đừng gọi phần mềm trung gian trên một số đường dẫn
export const config = {
    matcher:['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}