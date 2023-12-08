export const requestHandler = async (api, setLoading, onSuccess, onError) => {
    setLoading(true)
    if (setLoading) {
        setLoading(true)
    }
    try {
        const res = await api();
        const data = res
        if (data.status === 200 || data.status === 201) {
            onSuccess && onSuccess(data);
        }
    } catch (error) {
        console.log(error)
        onError(error?.response?.data?.message || "Something went wrong")
    } finally {
        if (setLoading) {
            setLoading(false)
        }
    }
}