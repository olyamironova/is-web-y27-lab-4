const Loader =  ({ message = "Loading..." }: { message?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-64">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mb-4"></div>
            <h1 className="text-center text-2xl font-semibold text-gray-500 dark:text-gray-400">
                {message}
            </h1>
        </div>
    );
};

export default Loader;
