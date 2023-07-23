const PurchaseStep = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-9 justify-center w-full">
                {/* Card ขั้นตอน 1 */}
                <div className="relative bg-white border border-[#D3D3D3] rounded-lg overflow-hidden h-[300px]">
                    <div className="flex justify-center items-center absolute top-0 right-0 rounded-bl-[20px] bg-[#D3D3D3] w-[47px]">
                        <p className="text-[#606060] text-xl font-bold">1</p>
                    </div>
                    <div className="flex flex-col p-6 gap-3">
                        <div className="rounded-full bg-[#D9D9D9] overflow-hidden w-[100px] h-[100px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="61"
                                viewBox="0 0 60 61"
                                fill="none"
                            >
                                <path
                                    d="M17.5 23.063H5V18.063H17.5V23.063ZM17.5 30.563H5V35.563H17.5V30.563ZM51.475 48.063L41.9 38.488C39.9 39.788 37.55 40.563 35 40.563C28.1 40.563 22.5 34.963 22.5 28.063C22.5 21.163 28.1 15.563 35 15.563C41.9 15.563 47.5 21.163 47.5 28.063C47.5 30.613 46.725 32.963 45.425 34.938L55 44.538L51.475 48.063ZM42.5 28.063C42.5 23.938 39.125 20.563 35 20.563C30.875 20.563 27.5 23.938 27.5 28.063C27.5 32.188 30.875 35.563 35 35.563C39.125 35.563 42.5 32.188 42.5 28.063ZM5 48.063H30V43.063H5V48.063Z"
                                    fill="#173559"
                                />
                            </svg>
                        </div>
                        <h4 className="text-lg">Lorem ipsum dolor</h4>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua
                        </p>
                    </div>
                </div>
                {/* Card ขั้นตอน 2 */}
                <div className="relative bg-white border border-[#D3D3D3] rounded-lg overflow-hidden h-[300px]">
                    <div className="flex justify-center items-center absolute top-0 right-0 rounded-bl-[20px] bg-[#D3D3D3] w-[47px]">
                        <p className="text-[#606060] text-xl font-bold">2</p>
                    </div>
                    <div className="flex flex-col p-6 gap-3">
                        <div className="rounded-full bg-[#D9D9D9] overflow-hidden w-[100px] h-[100px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="61"
                                viewBox="0 0 60 61"
                                fill="none"
                            >
                                <path
                                    d="M40.4355 22.6763C40.7812 22.6763 41.127 22.688 41.4668 22.7056C40.0371 15.1646 32.1914 9.39893 22.7227 9.39893C12.2461 9.39893 3.75 16.4653 3.75 25.1841C3.75 29.936 6.30469 34.2192 10.3066 37.1138C10.4717 37.2303 10.6063 37.3848 10.6991 37.5643C10.7919 37.7438 10.8402 37.943 10.8398 38.145C10.8398 38.2856 10.8105 38.4146 10.7754 38.5493C10.4531 39.7388 9.94336 41.6431 9.91992 41.731C9.87891 41.8833 9.82031 42.0356 9.82031 42.1938C9.82031 42.5396 10.1016 42.8267 10.4531 42.8267C10.5879 42.8267 10.6992 42.7739 10.8164 42.7095L14.9707 40.313C15.2813 40.1313 15.6152 40.02 15.9785 40.02C16.166 40.02 16.3535 40.0493 16.5352 40.1021C18.4746 40.6587 20.5664 40.9692 22.7285 40.9692C23.0801 40.9692 23.4258 40.9634 23.7715 40.9458C23.3555 39.7153 23.1328 38.4204 23.1328 37.0786C23.1328 29.1216 30.8789 22.6763 40.4355 22.6763ZM29.0508 17.6079C30.4453 17.6079 31.582 18.7388 31.582 20.1333C31.582 21.5278 30.4512 22.6587 29.0508 22.6587C27.6562 22.6587 26.5195 21.5278 26.5195 20.1333C26.5195 18.7388 27.6562 17.6079 29.0508 17.6079ZM16.4004 22.6587C15.0059 22.6587 13.8691 21.5278 13.8691 20.1333C13.8691 18.7388 15 17.6079 16.4004 17.6079C17.8008 17.6079 18.9316 18.7388 18.9316 20.1333C18.9316 21.5278 17.7949 22.6587 16.4004 22.6587ZM50.7832 47.0103C54.1172 44.5962 56.2441 41.0337 56.2441 37.0669C56.2441 29.8013 49.166 23.9126 40.4297 23.9126C31.6992 23.9126 24.6152 29.8013 24.6152 37.0669C24.6152 44.3325 31.6934 50.2212 40.4297 50.2212C42.2344 50.2212 43.9805 49.9634 45.5918 49.5005C45.7441 49.4536 45.8965 49.4302 46.0547 49.4302C46.3594 49.4302 46.6348 49.5239 46.8926 49.6704L50.3555 51.6626C50.4551 51.7212 50.5488 51.7622 50.6602 51.7622C50.7296 51.7628 50.7985 51.7496 50.8629 51.7234C50.9272 51.6973 50.9858 51.6587 51.0352 51.6099C51.084 51.5605 51.1226 51.5019 51.1487 51.4376C51.1749 51.3732 51.1881 51.3043 51.1875 51.2349C51.1875 51.106 51.1348 50.9771 51.1055 50.8481C51.0879 50.7778 50.6602 49.1899 50.3906 48.1939C50.3613 48.0825 50.3379 47.9712 50.3379 47.8599C50.3438 47.5142 50.5195 47.2036 50.7832 47.0103ZM35.168 34.9692C34.002 34.9692 33.0586 34.0259 33.0586 32.8657C33.0586 31.7056 34.002 30.7622 35.168 30.7622C36.334 30.7622 37.2773 31.7056 37.2773 32.8657C37.2773 34.0259 36.3281 34.9692 35.168 34.9692ZM45.709 34.9692C44.543 34.9692 43.5996 34.0259 43.5996 32.8657C43.5996 31.7056 44.543 30.7622 45.709 30.7622C46.875 30.7622 47.8184 31.7056 47.8184 32.8657C47.8156 33.4238 47.5923 33.9581 47.1971 34.3521C46.802 34.7462 46.267 34.968 45.709 34.9692Z"
                                    fill="#173559"
                                />
                            </svg>
                        </div>
                        <h4 className="text-lg">Lorem ipsum dolor</h4>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua
                        </p>
                    </div>
                </div>
                {/* Card ขั้นตอน 3 */}
                <div className="relative bg-white border border-[#D3D3D3] rounded-lg overflow-hidden h-[300px]">
                    <div className="flex justify-center items-center absolute top-0 right-0 rounded-bl-[20px] bg-[#D3D3D3] w-[47px]">
                        <p className="text-[#606060] text-xl font-bold">3</p>
                    </div>
                    <div className="flex flex-col p-6 gap-3">
                        <div className="rounded-full bg-[#D9D9D9] overflow-hidden w-[100px] h-[100px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="61"
                                viewBox="0 0 60 61"
                                fill="none"
                            >
                                <path
                                    d="M47.5 35.563V15.563C47.5 12.813 45.25 10.563 42.5 10.563H7.5C4.75 10.563 2.5 12.813 2.5 15.563V35.563C2.5 38.313 4.75 40.563 7.5 40.563H42.5C45.25 40.563 47.5 38.313 47.5 35.563ZM25 33.063C20.85 33.063 17.5 29.713 17.5 25.563C17.5 21.413 20.85 18.063 25 18.063C29.15 18.063 32.5 21.413 32.5 25.563C32.5 29.713 29.15 33.063 25 33.063ZM57.5 18.063V45.563C57.5 48.313 55.25 50.563 52.5 50.563H10V45.563H52.5V18.063H57.5Z"
                                    fill="#173559"
                                />
                            </svg>
                        </div>
                        <h4 className="text-lg">Lorem ipsum dolor</h4>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua
                        </p>
                    </div>
                </div>
                {/* Card ขั้นตอน 4 */}
                <div className="relative bg-white border border-[#D3D3D3] rounded-lg overflow-hidden h-[300px]">
                    <div className="flex justify-center items-center absolute top-0 right-0 rounded-bl-[20px] bg-[#D3D3D3] w-[47px]">
                        <p className="text-[#606060] text-xl font-bold">4</p>
                    </div>
                    <div className="flex flex-col p-6 gap-3">
                        <div className="rounded-full bg-[#D9D9D9] overflow-hidden w-[100px] h-[100px] flex justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="61"
                                viewBox="0 0 60 61"
                                fill="none"
                            >
                                <path
                                    d="M50 20.563H42.5V10.563H7.5C4.75 10.563 2.5 12.813 2.5 15.563V43.063H7.5C7.5 47.213 10.85 50.563 15 50.563C19.15 50.563 22.5 47.213 22.5 43.063H37.5C37.5 47.213 40.85 50.563 45 50.563C49.15 50.563 52.5 47.213 52.5 43.063H57.5V30.563L50 20.563ZM15 46.813C12.925 46.813 11.25 45.138 11.25 43.063C11.25 40.988 12.925 39.313 15 39.313C17.075 39.313 18.75 40.988 18.75 43.063C18.75 45.138 17.075 46.813 15 46.813ZM48.75 24.313L53.65 30.563H42.5V24.313H48.75ZM45 46.813C42.925 46.813 41.25 45.138 41.25 43.063C41.25 40.988 42.925 39.313 45 39.313C47.075 39.313 48.75 40.988 48.75 43.063C48.75 45.138 47.075 46.813 45 46.813Z"
                                    fill="#173559"
                                />
                            </svg>
                        </div>
                        <h4 className="text-lg">Lorem ipsum dolor</h4>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PurchaseStep;