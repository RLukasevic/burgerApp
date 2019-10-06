import React , {useEffect, useState} from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Auxilliary';


const withErrorHandler = (WrappedComp, axios) => {

    return props => {

    let [error,errorChange] = useState(null);

    const reqInterceptor =  axios.interceptors.request.use(request => {
        errorChange(null);
        return request;
    });

    const resInterceptor = axios.interceptors.response.use(res => res,e => {
        errorChange(e);
    });


    useEffect(() => {return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
    };}, [reqInterceptor, resInterceptor]);       

    const errorConfirmedHandler = () => {
        errorChange(null);
    };

        return (
            <Aux>
                <Modal show={error} cBackDrop={errorConfirmedHandler}>{error ? error.message : null}</Modal>
                <WrappedComp {...props} />
            </Aux>
        );
    };
}

export default withErrorHandler;