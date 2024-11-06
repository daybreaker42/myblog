/**
 * 게시물 중간 등 전체 페이지 말고 페이지 일부에서 error 메세지 및 button을 보여주는 컴포넌트
 */
export function ErrorCard({ error, buttonName, handleFn }: { error: Error, buttonName:string, handleFn: () => void }) {
    return (
        <div>
            <div className="bg-red-500 text-white p-4">
                <h1 className="text-2xl font-bold">Error</h1>
                <p>{error.message}</p>
            </div>
            <div className="flex justify-center">
                <button onClick={handleFn}>{buttonName}</button>
            </div>
        </div>
    );
}