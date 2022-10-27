export default async function(router) {
    const token = localStorage.getItem('token');

    if (!token) {
        return router.push('/auth/login');
    }

    // Check if token is expired
    const res = await fetch("https://api.lam-api.app-web.ml/auth/me", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (res.status !== 200) {
        localStorage.removeItem('token');
        return router.push('/auth/login');
    }

    return true;
}