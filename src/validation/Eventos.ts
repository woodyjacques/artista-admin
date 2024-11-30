import { FormEvent } from "react";
import { mostrarMensaje } from "../components/toast";
import axios, { AxiosResponse } from "axios";
import { api } from "./Urls";

const token = localStorage.getItem("ACCESS_TOKEN");

interface EventoResponse {
    message: string;
}

export const handleSubmitEvento = async (
    event: FormEvent,
    id: number,
    titulo: string,
    descripcion: string,
    ubicacion: string,
    link: string,
    imagen: string
): Promise<AxiosResponse<EventoResponse> | null> => {
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

    if (ubicacion === "") {
        mostrarMensaje("Ingrese la ubicación", MensajeErr);
        return null;
    }

    if (link === "") {
        mostrarMensaje("Ingrese el enlace", MensajeErr);
        return null;
    }

    if (imagen === "") {
        mostrarMensaje("Seleccione una imagen", MensajeErr);
        return null;
    }

    const method = id === 0 ? "post" : "patch";
    const url = id === 0 ? `${api}/eventos` : `${api}/eventos/${id}`;

    const requestData = {
        titulo,
        descripcion,
        ubicacion,
        link,
        imagen,
    };

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response: AxiosResponse<EventoResponse> = await axios[method](url, requestData, { headers });
        mostrarMensaje(response.data.message, MensajeAct);
        return response;
    } catch (error: any) {
        mostrarMensaje(error.response?.data?.message || "Error al enviar los datos", MensajeErr);
        return null;
    }
};

export async function obtenerEventos() {
    try {
        const response = await axios.get(`${api}/eventos`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function handleClickEliminar(evento: any) {
    const id = evento.id;
    const MensajeNegToast = document.getElementById("toast-negative");

    axios
        .delete(`${api}/eventos/${id}`, {
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
