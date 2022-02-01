import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes, faFrownOpen} from "@fortawesome/free-solid-svg-icons";
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
                <div className="icon">
                    <FontAwesomeIcon icon={faFrownOpen}/>
                </div>
                <h1 className="msg-err">{errorState}</h1>
                <div className="icon-close" onClick={remError}>
                    <FontAwesomeIcon icon={faTimes}/>
                </div>
            </div>
            :
            null
        }
        </>
        
    )
}