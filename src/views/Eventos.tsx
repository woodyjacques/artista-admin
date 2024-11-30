import { FormEvent, useEffect, useState } from "react";
import { handleClickEliminar, handleSubmitEvento, obtenerEventos } from "../validation/Eventos";
import { Modal } from "../components/toast";

function Eventos() {
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [link, setLink] = useState("");
    const [imagen, setImagen] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const toggleModal = () => {
        setId(0);
        setTitulo("");
        setDescripcion("");
        setUbicacion("");
        setLink("");
        setImagen("");
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (event: FormEvent) => {
        setIsLoading(true);

        const respuesta = await handleSubmitEvento(event, id, titulo, descripcion, ubicacion, link, imagen);

        if (respuesta?.data?.message) {
            toggleModal();
            window.location.reload();
        }

        setIsLoading(false);
    };

    const [eventos, setEventos] = useState<
        { id: number; titulo: string; descripcion: string; ubicacion: string; link: string; imagen: string }[]
    >([]);

    useEffect(() => {
        obtenerEventos()
            .then((data) => {
                setEventos(data);
                console.log(data, "Los eventos");
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleActualizar = (
        id: number,
        titulo: string,
        descripcion: string,
        ubicacion: string,
        link: string,
        imagen: string
    ) => {
        setId(id);
        setTitulo(titulo);
        setDescripcion(descripcion);
        setUbicacion(ubicacion);
        setLink(link);
        setImagen(imagen);
        toggleModalAct();
        console.log(imagen);
    };

    const toggleModalAct = () => {
        setIsOpen(!isOpen);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <div className="bg-gray-900 p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14 shadow-md">
            <div className="text-black text-2xl mb-4 p-4 rounded-lg shadow-lg bg-gray-200 flex items-center justify-between">
                <p className="text-center">Eventos</p>
                <button
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={toggleModal}
                >
                    Agregar
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">Título</th>
                            <th scope="col" className="px-6 py-3">Descripción</th>
                            <th scope="col" className="px-6 py-3">Ubicación</th>
                            <th scope="col" className="px-6 py-3">Link</th>
                            <th scope="col" className="px-6 py-3">Imagen</th>
                            <th scope="col" className="px-6 py-3">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map((evento, index) => (
                            <tr key={index} className="border-b bg-gray-900 border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {evento.titulo}
                                </th>
                                <td className="px-6 py-4">{evento.descripcion.slice(0, 50)}...</td>
                                <td className="px-6 py-4">{evento.ubicacion}</td>
                                <td className="px-6 py-4">
                                    <a href={evento.link} target="_blank" rel="noopener noreferrer">Link</a>
                                </td>
                                <td className="px-6 py-4">
                                    <img src={evento.imagen} alt="" className="w-12 h-12 rounded-full" />
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-500 hover:underline"
                                        onClick={() =>
                                            handleActualizar(
                                                evento.id,
                                                evento.titulo,
                                                evento.descripcion,
                                                evento.ubicacion,
                                                evento.link,
                                                evento.imagen
                                            )
                                        }
                                    >
                                        Actualizar
                                    </a>
                                    <a href="#"
                                        onClick={showModal}
                                        className="ml-8 font-medium text-red-500 hover:underline"
                                    >
                                        Eliminar
                                    </a>
                                    <Modal
                                        onConfirm={() => {
                                            handleClickEliminar(evento);
                                            showModal();
                                        }}
                                        isVisible={isModalVisible}
                                        onClose={showModal}
                                        message="¿Estás seguro de eliminar el evento?"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isOpen && (
                <div
                    id="authentication-modal"
                    className="bg-gray-100 bg-opacity-50 formPer fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
                    aria-hidden={!isOpen ? "true" : undefined}
                >
                    <div
                        className="relative w-full max-w-md max-h-full"
                        aria-hidden={isOpen ? "false" : "true"}
                    >
                        <div className="relative bg-gray-900 rounded-lg shadow-lg">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                                data-modal-hide="authentication-modal"
                                onClick={toggleModal}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-white">Eventos</h3>

                                <p
                                    id="MensajeErrCat"
                                    className=" hidden text-red-500 text-sm font-medium rounded-lg text-center"
                                ></p>
                                <p
                                    id="MensajeCat"
                                    className=" hidden text-green-500 text-sm font-medium rounded-lg text-center"
                                ></p>

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">Título</label>
                                        <input
                                            placeholder="título"
                                            type="text"
                                            className="bg-gray-600 border text-white text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">Descripción</label>
                                        <textarea
                                            placeholder="Descripción"
                                            className="bg-gray-600 border text-white text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">Ubicación</label>
                                        <input
                                            placeholder="ubicación"
                                            type="text"
                                            className="bg-gray-600 border text-white text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                            value={ubicacion}
                                            onChange={(e) => setUbicacion(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">Link</label>
                                        <input
                                            placeholder="link"
                                            type="text"
                                            className="bg-gray-600 border text-white text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">Imagen</label>
                                        <input
                                            placeholder="enlace de la imagen"
                                            type="text"
                                            className="bg-gray-600 border text-white text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                            value={imagen}
                                            onChange={(e) => setImagen(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Guardando..." : "Guardar"}
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Eventos;
