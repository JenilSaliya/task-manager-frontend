import config from "./config";

export const loginCheck = async (data) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions = {

        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"

    };

    try {
        
        const response = await fetch(`${config.Backend_URI}login`, requestOptions)
        const result = await response.json()
        return result

    }
    catch (err) {

        throw new Error(err.message)

    }

}

export const createUser = async (data) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({

        "name": data.name,
        "email": data.email,
        "password": data.password

    });

    const requestOptions = {

        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"

    };

    try {

        const response = await fetch(`${config.Backend_URI}user`, requestOptions)
        const result = await response.json()
        return result

    }
    catch (err) {

        throw new Error(err.message)

    }

}

export const getUser = async () => {

    const requestOptions = {

        method: "GET",
        redirect: "follow"

    };

    try {

        const response = await fetch(`${config.Backend_URI}user`, requestOptions)
        const result = await response.json()
        return result

    }
    catch (err) {

        throw new Error(err.message)

    }

}

export const updateUser = async (userId, data) => {

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const raw = JSON.stringify({

        id: userId,
        name: data.name,
        email: data.email,
        password: data.password

    })

    const requestOptions = {

        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"

    }

    const response = await fetch(`${config.Backend_URI}user`, requestOptions)
    const result = await response.json()
    return result

};

export const deleteUser = async (userId) => {

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    const raw = JSON.stringify({ id: userId })

    const requestOptions = {

        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"

    }

    const response = await fetch(`${config.Backend_URI}user`, requestOptions)
    const result = response.json()
    return result

}