
const BtnGoBack = () => {
    return (
        <div className="max-w-[1200px] flex flex-col items-center min-[325px]:mx-8 xl:mx-auto pt-4">
            <button className="group w-26 self-start cursor-pointer text-[#4A55A7] font-medium border border-[#DFE1F5] bg-btn-filter transition rounded-md py-2 px-3 hover:bg-btn-filter-hover hover:border-[#4A55A7]">
                <a className="flex items-center justify-between gap-2" href="/">
                    <svg className="group-hover:-translate-x-1 transition" width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#4A55A7" stroke="#4A55A7" strokeWidth="25.6" transform="matrix(1, 0, 0, 1, 0, 0)">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="8.192"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fill="#4A55A7" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                            <path fill="#4A55A7" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
                        </g>
                    </svg>
                    Volver
                </a>
            </button>
        </div>
    );
}
 
export default BtnGoBack;