import api from "src/api";

export const checkAuth = async () => {
    let isAuthed = true;

    await api.getUser()
        .then(() => {}
        )
        .catch((err) => {
            if (err.status === 401) {
                isAuthed = false;
            }
        })

    return isAuthed
}
