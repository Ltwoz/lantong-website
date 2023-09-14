import ModalLayout from "./modal-layout";

const LoadingModal = (props) => {
    const { title, setIsOpen } = props;
    return (
        <ModalLayout setIsOpen={setIsOpen} allowOutsideClick={false}>
            <div className="w-[75vw] md:w-[20rem] px-6 py-6 flex flex-col items-center justify-between select-none">
                <div className="flex flex-row w-full gap-2">
                    <div className="relative flex items-center">
                        <div className="w-8 h-8 mr-2 border-4 border-gray-300/80 border-t-4 border-t-gray-800/80 rounded-[50%] animate-spin"></div>
                    </div>
                    <div className="flex items-center text-left">
                        <h3
                            className="text-base md:text-lg font-medium leading-6 text-gray-900"
                            id="modal-title"
                        >
                            {title}
                        </h3>
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
};

export default LoadingModal;
