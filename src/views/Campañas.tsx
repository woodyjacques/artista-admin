import { FormEvent, useEffect, useState } from "react";
import { handleClickEl, handleSubmitCampañas, obtenercampañas } from "../validation/Campaña";
import { Modal } from "../components/toast";

function Campañas() {
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState("");
    const [subtitulo, setSubTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [beneficio, setBeneficio] = useState("");
    const [beneficios, setBeneficios] = useState<string[]>([]);
    const [imagenUno, setImagenUno] = useState("");
    const [imagenDos, setImagenDos] = useState("");
    const [icono, setIcono] = useState("");
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const toggleModal = () => {
        setId(0);
        setTitulo("");
        setSubTitulo("");
        setDescripcion("");
        setBeneficio("");
        setBeneficios([]);
        setLink("");
        setImagenUno("");
        setImagenDos("");
        setIcono("");
        setIsOpen(!isOpen);
    };

    const handleAddBeneficio = () => {
        if (beneficio) {
            setBeneficios([...beneficios, beneficio]);
            setBeneficio("");
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        setIsLoading(true);

        const respuesta = await handleSubmitCampañas(event, id, titulo, subtitulo, descripcion,
            beneficios, imagenUno, imagenDos, icono, link);

        if (respuesta?.data?.message) {
            toggleModal();
            window.location.reload();
        }

        setIsLoading(false);
    };

    const [campaña, setCampaña] = useState<
        {
            id: number; titulo: string; subtitulo: string; descripcion: string; beneficios: string[]; imagenUno: string; imagenDos: string; icono: string; link: string
        }[]
    >([]);

    useEffect(() => {
        obtenercampañas()
            .then((data) => {
                setCampaña(data);
                console.log(data, "Las campañas");
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleActualizar = (
        id: number, titulo: string,
        subtitulo: string, descripcion: string,
        imagenUno: string, imagenDos: string,
        icono: string, link: string
    ) => {
        setId(id); setTitulo(titulo);
        setDescripcion(descripcion); setSubTitulo(subtitulo);
        setImagenUno(imagenUno); setImagenDos(imagenDos);
        setIcono(icono); setLink(link);
        toggleModalAct();
    };

    const toggleModalAct = () => {
        setIsOpen(!isOpen);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <div className=" bg-gray-900 p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14 shadow-md">
            <div className="text-black text-2xl mb-4 p-4 rounded-lg shadow-lg bg-gray-200 flex items-center justify-between">
                <p className="text-center">Campañas</p>
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
                            <th scope="col" className="px-6 py-3">
                                Titulo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Subtitulo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descripción
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Beneficios
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Imagen uno
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Imagen dos
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Icono
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Link
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaña.map((cate, index) => (
                            <tr
                                key={index}
                                className=" border-b bg-gray-900 border-gray-700"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                                >
                                    {cate.titulo}
                                </th>
                                <td className="px-6 py-4">{cate.subtitulo}</td>
                                <td className="px-6 py-4">{cate.descripcion.slice(0, 50)}...</td>
                                <td className="px-6 py-4">{cate.beneficios}</td>
                                <td className="px-6 py-4">
                                    <img src={cate.imagenUno} alt="" className="w-30 h-30 rounded-full" />
                                </td>
                                <td className="px-6 py-4">
                                    <img src={cate.imagenDos} alt="" className="w-30 h-30 rounded-full" />
                                </td>
                                <td className="px-6 py-4">
                                    <img src={cate.icono} alt="" className="w-30 h-30 rounded-full" />
                                </td>
                                <td className="px-6 py-4">
                                    <a href={cate.link} target="_blank" rel="noopener noreferrer">Link</a>
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-500 hover:underline"
                                        onClick={() =>
                                            handleActualizar(
                                                cate.id,
                                                cate.titulo,
                                                cate.subtitulo,
                                                cate.descripcion,
                                                cate.imagenUno,
                                                cate.imagenDos,
                                                cate.icono,
                                                cate.link
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
                                            handleClickEl(cate);
                                            showModal();
                                        }}
                                        isVisible={isModalVisible}
                                        onClose={showModal}
                                        message="¿Estás seguro de eliminar la campaña?"
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
                                <h3 className="mb-4 text-xl font-medium text-white">Campañas</h3>

                                <p
                                    id="MensajeErrCat"
                                    className=" hidden text-red-500 text-sm font-medium rounded-lg text-center"
                                ></p>
                                <p
                                    id="MensajeCat"
                                    className=" hidden text-green-500 text-sm font-medium rounded-lg text-center"
                                ></p>

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex-1">
                                            <label className="block mb-2 text-sm font-medium text-white">Título</label>
                                            <input
                                                type="text"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                placeholder="Título"
                                                value={titulo}
                                                onChange={(e) => setTitulo(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block mb-2 text-sm font-medium text-white">Subtítulo</label>
                                            <input
                                                type="text"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                placeholder="Subtítulo"
                                                value={subtitulo}
                                                onChange={(e) => setSubTitulo(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex-1">
                                            <label className="block mb-2 text-sm font-medium text-white">Link</label>
                                            <input
                                                type="text"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                placeholder="El enlace"
                                                value={link}
                                                onChange={(e) => setLink(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block mb-2 text-sm font-medium text-white">Icono</label>
                                            <input
                                                type="text"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                value={icono}
                                                onChange={(e) => setIcono(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex-1">
                                            <label className="block mb-2 text-sm font-medium text-white">Imagen uno</label>
                                            <input
                                                type="text"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                value={imagenUno}
                                                onChange={(e) => setImagenUno(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block mb-2 text-sm font-medium text-white">Imagen dos</label>
                                            <input
                                                type="text"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                value={imagenDos}
                                                onChange={(e) => setImagenDos(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <label className="block mb-2 text-sm font-medium text-white">Beneficios</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                                placeholder="Beneficio"
                                                value={beneficio}
                                                onChange={(e) => setBeneficio(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-0 top-0 bg-blue-500 text-white p-2 rounded-r-lg"
                                                onClick={handleAddBeneficio}
                                            >
                                                Agregar
                                            </button>
                                        </div>
                                        <ul className="mt-2 text-sm text-gray-400">
                                            {beneficios.map((item, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-white">Descripción</label>
                                        <textarea
                                            placeholder="Descripción"
                                            className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="mb-10 mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Agregando..." : "Agregar"}
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

export default Campañas;
