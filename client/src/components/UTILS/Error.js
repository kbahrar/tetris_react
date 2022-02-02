import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {removeError} from '../../actions'

export default function Error (props) {
    const errorState = useSelector((state) => state.error);
    const dispatch = useDispatch();

    const remError = (e) => {
        dispatch(removeError());
    }

    return (
        <>
        {errorState ?
            <div className="alert-error">
                <h1 className="msg-err">{errorState}</h1>
                <div className="icon-close" onClick={remError}>
                    x
                </div>
            </div>
            :
            null
        }
        </>
        
    )
}