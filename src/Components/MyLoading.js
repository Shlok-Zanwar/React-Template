import { SemipolarLoading } from "react-loadingg";

/**
 * @param {boolean} loading
 * @param {React.ReactNode} children
 * @returns {React.ReactNode}
 * 
*/
export const ImagesAppLoading = ({
    loading=true,
    children,
}) => {

    return loading ? (
        <div className="loading-container">
            <SemipolarLoading size="large" color="#F50057" />
        </div>
    ) : children;
};