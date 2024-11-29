import { FormEvent } from "react";
import { mostrarMensaje } from "../components/toast";
import axios, { AxiosResponse } from "axios";
import { api } from "./Urls";

const token = localStorage.getItem("ACCESS_TOKEN");

interface CampanaResponse {
    message: string;
}

export const handleSubmitCampañas = async (
    event: FormEvent,
    id: number,
    titulo: string,
    subtitulo: string,
    descripcion: string,
    beneficios: string[],
    imagenUno: string,
    imagenDos: string,
    icono: string,
    link: string
): Promise<AxiosResponse<CampanaResponse> | null> => {
    event.preventDefault();
    const MensajeErr = document.getElementById("MensajeErrCat");
    const MensajeAct = document.getElementById("MensajeCat");

    if (titulo === "") {
        mostrarMensaje("Ingrese el título", MensajeErr);
        return null;
    }

    if (subtitulo === "") {
        mostrarMensaje("Ingrese el subtítulo", MensajeErr);
        return null;
    }

    if (link === "") {
        mostrarMensaje("Ingrese el enlace", MensajeErr);
        return null;
    }

    if (icono === "") {
        mostrarMensaje("Seleccione un ícono", MensajeErr);
        return null;
    }

    if (imagenUno === "") {
        mostrarMensaje("Seleccione una imagen para la primera imagen", MensajeErr);
        return null;
    }

    if (imagenDos === "") {
        mostrarMensaje("Seleccione una imagen para la segunda imagen", MensajeErr);
        return null;
    }

    if (beneficios.length === 0) {
        mostrarMensaje("Ingrese al menos un beneficio", MensajeErr);
        return null;
    }

    if (descripcion === "") {
        mostrarMensaje("Ingrese la descripción", MensajeErr);
        return null;
    }

    const method = id === 0 ? 'post' : 'patch';
    const url = id === 0 ? `${api}/campanas` : `${api}/campanas/${id}`;

    const requestData = {
        titulo, subtitulo, descripcion, beneficios, link, imagenUno, imagenDos, icono
    };

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response: AxiosResponse<CampanaResponse> = await axios[method](url, requestData, { headers });
        mostrarMensaje(response.data.message, MensajeAct);
        return response;
    } catch (error: any) {
        mostrarMensaje(error.response?.data?.message || "Error al enviar los datos", MensajeErr);
        return null;
    }
};

export async function obtenercampañas() {
    try {
        const response = await axios.get(`${api}/campanas`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function handleClickEl(cate: any) {
    const id = cate.id;
    const MensajeNegToast = document.getElementById("toast-negative");
  
    axios
      .delete(`${api}/campanas/${id}`, {
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
