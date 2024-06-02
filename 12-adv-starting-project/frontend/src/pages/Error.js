import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {

    const error = useRouteError();

    let title = 'An error occurred!';
    let message = 'Something went wrong';

    if (error.status === 500) { //Esse é para quando o erro é no fetch, no backend
        message = error.data.message;
    }

    if (error.status === 404) { //Esse é para quando o erro é no frontend, erro de path.
        title = 'Not found!';
        message = 'Could not find resource or page.'
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}