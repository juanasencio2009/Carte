import axios from 'axios';
import logger from 'sabio-debug';
import * as helper from './serviceHelpers';

const _logger = logger.extend('MenuItemsService');
const endpoint = `${helper.API_HOST_PREFIX}/api/menuitems`;

let getById = (id) => {
    _logger(`getById invoked. ID--->${id}`);
    const config = {
        method: 'GET',
        url: `${endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let add = (payload) => {
    _logger(`Add invoked. Payload--->${payload}`);
    const config = {
        method: 'POST',
        url: `${endpoint}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
let AddAllItems = (payload) => {
    _logger('Update invoked. id--->', payload, payload.organizationId);
    const config = {
        method: 'POST',
        url: `${endpoint}/add/all`, //${payload.OrganizationId}
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let UpdateAllItems = (payload) => {
    _logger('Update invoked. id--->', payload, payload.id);
    const config = {
        method: 'PUT',
        url: `${endpoint}/update/all`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let update = (payload) => {
    _logger('Update invoked. id--->', payload, payload.id);
    const config = {
        method: 'PUT',
        url: `${endpoint}/${payload.id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let deleteById = (id) => {
    _logger(`DeleteById invoked. ID--->${id}`);
    const config = {
        method: 'DELETE',
        url: `${endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getByIngredientId = (id) => {
    _logger(`GetByIngredientId invoked. ID--->${id}`);
    const config = {
        method: 'GET',
        url: `${endpoint}/ingredient/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let menuItemIngredientsDeleteById = (id) => {
    _logger(`MenuItemIngredientsDeleteById invoked. ID--->${id}`);
    const config = {
        method: 'DELETE',
        url: `${endpoint}/ingredients/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getAllFoodSafeTypes = (pageIndex, pageSize) => {
    _logger(`GetAllFoodSafeTypes invoked.Parameters--->${pageIndex}, ${pageSize} `);
    const config = {
        method: 'GET',
        url: `${endpoint}/foodsafetypes?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getByFoodSafeTypeId = (id) => {
    _logger(`GetByFoodSafeTypeId invoked.ID--->${id} `);
    const config = {
        method: 'GET',
        url: `${endpoint}/foodsafetypes/menu/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getPagedQueryByOrgId = (id, pageIndex, pageSize, queryString) => {
    _logger(`getByOrgId invoked.Parameters--->${id}, ${pageIndex}, ${pageSize}, ${queryString}`);
    const config = {
        method: 'GET',
        url: `${endpoint}/organization/paged/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}${queryString}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
let getAllByOrgId = (orgId) => {
    _logger(`getAllByOrgId invoked.orgId--->${orgId}`);
    const config = {
        method: 'GET',
        url: `${endpoint}/organization/${orgId}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getByCreatedBy = (id) => {
    _logger(`getByCreatedBy invoked.ID--->${id} `);
    const config = {
        method: 'GET',
        url: `${endpoint}/createdby/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const menuItemsService = {
    getById,
    add,
    update,
    AddAllItems,
    UpdateAllItems,
    deleteById,
    getByIngredientId,
    menuItemIngredientsDeleteById,
    getAllFoodSafeTypes,
    getByFoodSafeTypeId,
    getPagedQueryByOrgId,
    getAllByOrgId,
    getByCreatedBy,
};
export default menuItemsService;
