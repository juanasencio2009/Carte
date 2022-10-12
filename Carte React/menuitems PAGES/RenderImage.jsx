import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useFormikContext } from 'formik';

import logger from 'sabio-debug';
const _logger = logger.extend('RenderImage');

function RenderImage() {
    const location = useLocation();
    const { values } = useFormikContext();

    const currentImage = () => {
        _logger('currentImage');
        if (location.state?.payload.imageUrl && location.state?.payload.imageUrl !== null) {
            let menuFst = location.state?.payload.imageUrl;
            return menuFst;
        } else if (values?.imageUrl) {
            _logger('values', values);
            let value = values.imageUrl;
            return value;
        } else return null;
    };
    return (
        <React.Fragment>
            <Row>
                <label>Current Image</label>
                <Card.Img src={currentImage()} className="menu-items-image-container" alt="" />
                <p></p>
            </Row>
        </React.Fragment>
    );
}

export default React.memo(RenderImage);
