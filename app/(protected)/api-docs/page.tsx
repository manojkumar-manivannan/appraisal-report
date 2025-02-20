import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./ReactSwagger";
const ApiPage = async () => {
    const spec = await getApiDocs();
    return (
        <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll bg-gray-200 px-6 py-4">
            <ReactSwagger spec={spec} />
        </div>
    );
};
export default ApiPage;
