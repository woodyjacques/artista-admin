import { FormEvent } from "react";
import { mostrarMensaje } from "../components/toast";
import axios, { AxiosResponse } from "axios";
import { api } from "./Urls";

const token = localStorage.getItem("ACCESS_TOKEN");

interface ClubResponse {
    message: string;
}

export const handleSubmitClub = async (
    event: FormEvent,
    id: number,
    titulo: string,
    descripcion: string,
    icono: string,
    membresia: string
): Promise<AxiosResponse<ClubResponse> | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("MensajeErrCat");
    const MensajeAct = document.getElementById("MensajeCat");

    if (titulo === "") {
        mostrarMensaje("Ingrese el título", MensajeErr);
        return null;
    }

    if (descripcion === "") {
        mostrarMensaje("Ingrese la descripción", MensajeErr);
        return null;
    }

    if (icono === "") {
        mostrarMensaje("Ingrese el ícono", MensajeErr);
        return null;
    }

    if (membresia === "") {
        mostrarMensaje("Seleccione una membresía", MensajeErr);
        return null;
    }

    const method = id === 0 ? "post" : "patch";
    const url = id === 0 ? `${api}/clubs` : `${api}/clubs/${id}`;

    const requestData = {
        titulo,
        descripcion,
        icono,
        membresia,
    };

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response: AxiosResponse<ClubResponse> = await axios[method](url, requestData, { headers });
        mostrarMensaje(response.data.message, MensajeAct);
        return response;
    } catch (error: any) {
        mostrarMensaje(error.response?.data?.message || "Error al enviar los datos", MensajeErr);
        return null;
    }
};

export async function obtenerClubs() {
    try {
        const response = await axios.get(`${api}/clubs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function handleClickEliminar(club: any) {
    const id = club.id;
    const MensajeNegToast = document.getElementById("toast-negative");

    axios
        .delete(`${api}/clubs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response);
            window.location.reload();
        })
        .catch((error) => {
            if (error.response) {
                mostrarMensaje(error.response.data.error, MensajeNegToast);
            }
        });
}
