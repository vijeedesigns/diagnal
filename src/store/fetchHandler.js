export function fetchHandler({
    url,
    method = "GET",
    actionType,
    body
}, successHandler, errorHandler) {
    return (dispatch) => {
        const request = fetch(url, {
            method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body
        });

        request
            .then(data => {
                return data.json();
            })
            .then(response => {
                dispatch({
                    type: actionType,
                    payload: response
                });
                return successHandler ? successHandler(response) : null;
            })
            .catch(err => {
                const errorObj = {
                    error: {
                        url,
                        code: "FETCH_FAILED",
                        message: err
                    }
                };
                return errorHandler ? errorHandler(errorObj) : null;
            });
    }
}