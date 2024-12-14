import api from "src/api";

export const checkAuth = async () => {
    let isAuthed = false;

    await api.getUser()
        .then(() => isAuthed = true
        )
        .catch(() => {})

    return isAuthed
}
