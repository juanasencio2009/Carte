import React from 'react';
import { useState, useEffect } from 'react';
import { Field } from 'formik';
import logger from 'sabio-debug';
import * as lookUpService from '../../services/lookUpService';
import toastr from 'toastr';

import 'toastr/build/toastr.min.css';

const _logger = logger.extend('OrderStatusDropdown');

function OrderStatusDropdown() {
    const [orderStatus, setOrderStatus] = useState([]);

    useEffect(() => {
        serviceCalls();
    }, []);

    const serviceCalls = () => {
        const tableName = ['StatusTypes'];
        lookUpService.getTypes(tableName).then(getOrderStatusSuccess).catch(getOrderStatusError);
    };
    const getOrderStatusSuccess = (response) => {
        let arrayOfStatus = response?.item.statusTypes;
        setOrderStatus(arrayOfStatus?.map(mapStatusDropDown));
    };
    const getOrderStatusError = () => {
        _logger('getItemError');
        toastr.error('Oops, something failed fetching possible Order Status');
    };

    const mapStatusDropDown = (status) => {
        return (
            <option value={status.id} key={`order_status_dropdown_${status.id}`}>
                {status.name}
            </option>
        );
    };
    return (
        <React.Fragment>
            <label>Select Order Status</label>
            <Field
                name="orderStatus"
                label="Select Order Status Id"
                as="select"
                id="orderStatus"
                containerlass="mb-3"
                className="form-select menu-item-form-input"
                key="select">
                <option>...</option>
                {orderStatus}
            </Field>
        </React.Fragment>
    );
}

export default React.memo(OrderStatusDropdown);
