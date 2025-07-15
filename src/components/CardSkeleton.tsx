const CardSkeleton = () => {
    return (
        <div className="group bg-white rounded-xl shadow-md border border-gray-200 p-8 transition-all duration-300 hover:cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-t from-black/5 via-transparent to-transparent">
            <div className="flex justify-between mb-4">
                <span className="min-w-20 h-7 bg-gray-500 animate-pulse rounded-xl px-2"></span>
                <span className="min-w-20 h-7 bg-gray-500 animate-pulse rounded-xl px-2"></span>
            </div>
            <div className="w-54 h-48 bg-gray-500 animate-pulse object-contain rounded-lg transition-all duration-300 group-hover:scale-105" />
            <div className="w-54 bg-gray-500 animate-pulse rounded-xl p-6 pb-0 mt-4"></div>
        </div>
    );
}
 
export default CardSkeleton;