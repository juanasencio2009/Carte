import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menuItemsService from '../../services/menuItemsService';
import logger from 'sabio-debug';
import { Col, Row } from 'react-bootstrap';
import toastr from 'toastr';
import Pagination from 'rc-pagination';
import MenuItemCard from './MenuItemCard';

import 'toastr/build/toastr.min.css';
import 'rc-pagination/assets/index.css';
import './menuitems.css';

const _logger = logger.extend('MenuItems');
const orgId = 1; //NOTE: this will be the user.orgId
let pageIndex = 0;
const pageSize = 6;
let queryString = '';

function MenuItems() {
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState([]);
    const [queryState, setQueryState] = useState();
    const [current, setCurrent] = useState({
        totalCount: 0,
        currentPage: 0,
    });

    useEffect(() => {
        serviceCalls();
    }, []);
    const serviceCalls = () => {
        menuItemsService
            .getPagedQueryByOrgId(orgId, pageIndex, pageSize, queryString)
            .then(getMenuItemsSuccess)
            .catch(getMenuItemsError);
    };
    const getMenuItemsSuccess = (data) => {
        _logger('getMenuItemsSuccess', data.item);
        let totalCount = data.item.totalCount;
        setCurrent((prevState) => {
            const pd = { ...prevState };
            pd.totalCount = totalCount;
            return pd;
        });

        let menuItemArray = data.item.pagedItems;
        menuItemArray.map((item) => {
            item.unitCost = parseFloat(item.unitCost).toFixed(2);
            return item;
        });
        setMenuItems(menuItemArray);
    };
    const getMenuItemsError = (err) => {
        _logger('onERROR', err);
        toastr.error('Oops, something went wrong when fetching your menu items.');
    };

    const onSearchChange = (e) => {
        let query = e.target.value;
        setQueryState(query);
    };
    const onSearchClicked = () => {
        if (queryState) {
            queryString = `&query=${queryState}`;
            pageIndex = 0;
        }
        menuItemsService
            .getPagedQueryByOrgId(orgId, pageIndex, pageSize, queryString)
            .then(getMenuItemsSuccess)
            .catch(getMenuItemsError);
    };
    const onPaginate = (e) => {
        pageIndex = e - 1;
        menuItemsService
            .getPagedQueryByOrgId(orgId, pageIndex, pageSize, queryString)
            .then(getMenuItemsSuccess)
            .catch(getMenuItemsError);

        setCurrent((prevState) => {
            const pd = { ...prevState };
            pd.currentPage = pageIndex;
            return pd;
        });
    };
    const mapMenuItem = () => {
        if (menuItems?.length > 0) {
            return menuItems.map(renderMenuItemCard);
        }
        return null;
    };
    const renderMenuItemCard = (item) => {
        return <MenuItemCard menuItem={item} key={`menu_item_card_${item.id}`} />;
    };
    const onBuilderClicked = () => {
        navigate(`/menuitem/builder`);
    };
    return (
        <React.Fragment>
            <Col>
                <Col>
                    <Row className="menu-items-by-org-row">
                        <Col sm={4}>
                            <h4 className="header-title mb-2">Your Menu Items</h4>
                            <p className="text-muted font-14 mb-4">Please review all Menu Item contents.</p>
                        </Col>
                        <Col>
                            <div className="input-group">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="form1">
                                        Search Menu Item by Name
                                    </label>
                                    <input
                                        id="search-input"
                                        type="search"
                                        className="form-control"
                                        onChange={onSearchChange}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary menu-items-by-org-button"
                                    onClick={onSearchClicked}>
                                    Search
                                </button>
                            </div>
                        </Col>
                        <Col>
                            <button className=" btn btn-primary menu-item-card-button" onClick={onBuilderClicked}>
                                Manage Menu Items
                            </button>
                        </Col>
                    </Row>
                </Col>
                <p></p>

                <Row>{mapMenuItem()}</Row>
                <Row className="menu-items-by-org-row">
                    <Col>
                        <nav>
                            <Pagination
                                current={current.currentPage + 1}
                                total={current.totalCount}
                                onChange={onPaginate}
                                pageSize={pageSize}
                            />
                        </nav>
                    </Col>
                </Row>
            </Col>
        </React.Fragment>
    );
}

export default MenuItems;
