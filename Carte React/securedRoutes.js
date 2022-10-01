import { lazy } from 'react';

const AnalyticsDashboards = lazy(() => import('../pages/dashboard/Analytics'));
const NewsletterSubAdminSubscribers = lazy(() => import('../components/newsletter/NewsletterSubAdminSubscribers'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const Menus = lazy(() => import('../pages/menus/Menus'));
const MenuItemAddForm = lazy(() => import('../pages/menuitems/MenuItemAddForm'));
const MenuItemTable = lazy(() => import('../pages/menuitems/MenuItems'));
const MenuItemBuilder = lazy(() => import('../pages/menuitems/MenuItemBuilder'));
const MenuBuilderContainer = lazy(() => import('../pages/menus/MenuBuilderContainer'));

// employees
const Employees = lazy(() => import('../components/employee/Employees'));
const EmployeesForm = lazy(() => import('../components/employee/EmployeeForm'));
const EmployeeView = lazy(() => import('../components/employee/EmployeeDetails'));
const OrgWizard = lazy(() => import('../pages/wizard/OrgWizard'));
const OrgInvite = lazy(() => import('../pages/wizard/OrgInvite'));
const LicenseUserPage = lazy(() => import('../components/licenses/LicenseUserPage'));

//tags
const MenuItemTags = lazy(() => import('../components/tags/MenuItemTags'));
//userProfiles
const UserProfileForm = lazy(() => import('../components/userprofile/UserProfileForm'));
const UserProfile = lazy(() => import('../components/userprofile/UserProfileList'));
const UserProfileView = lazy(() => import('../components/userprofile/SingleUserProfile'));
//ingredients
const Ingredients = lazy(() => import('../components/ingredients/Ingredients'));
const IngredientAdd = lazy(() => import('../components/ingredients/IngredientAdd'));
const Cart = lazy(() => import('../pages/cart/Cart'));

//alternate ingredients
const AlternateIngredientsParentForm = lazy(() =>
    import('../components/AlternateIngredients/AlternateIngredientsParentForm')
);

//location
const LocationForm = lazy(() => import('../pages/location/LocationFormContainer'));
const UserLocations = lazy(() => import('../pages/location/UserLocations'));

const AdminDashboard = lazy(() => import('../pages/admindashboard/AdminDashboard'));

//dashboard
const Dashboard = lazy(() => import('../pages/dashboard/Analytics/Organization/Dashboard'));
const LicensesAdminPage = lazy(() => import('../components/licenses/LicensesAdminPage'));
const MenuEditorDash = lazy(() => import('../components/dashboard/menueditor/MenuEditorDash'));

const InternalAnalytics = lazy(() => import('../pages/analytics/InternalAnalytics'));

const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboards',
        icon: 'uil-home-alt',
        header: 'Navigation',
        children: [
            {
                path: '/dashboard/analytics',
                name: 'Analytics',
                element: AnalyticsDashboards,
                roles: ['SysAdmin'],
                exact: true,
                isAnonymous: false,
            },
            {
                path: '/dashboards/internalanalytics',
                name: 'InternalAnalytics',
                element: InternalAnalytics,
                roles: ['Admin'],
                exact: true,
                isAnonymous: false,
            },
        ],
    },
    {
        path: `/dashboards/menueditor`,
        name: `Overview`,
        element: MenuEditorDash,
        roles: ['MenuEditor', 'OrgAdmin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/dashboard',
        name: 'Organization Dashboard',
        element: Dashboard,
        roles: ['OrgAdmin'],
        exact: true,
        isAnonymous: false,
    },
];

const adminDashboardRoutes = [
    {
        path: '/admin/dashboard/analytics',
        name: 'AdminDashboard',
        element: AdminDashboard,
        roles: ['SysAdmin'],
        exact: true,
        isAnonymous: false,
    },
];

const menuItemsRoutes = [
    {
        path: '/menuitem/add',
        name: 'menuItemForm',
        element: MenuItemAddForm,
        roles: ['OrgAdmin', 'MenuEditor'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/menuitem/edit/:id',
        name: 'MenuItemAddForm',
        element: MenuItemAddForm,
        roles: ['MenuEditor', 'OrgAdmin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/menuitem',
        name: 'MenuItemById',
        element: MenuItemTable,
        roles: ['MenuEditor', 'OrgAdmin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/menuitem/builder',
        name: 'MenuItemBuilder',
        element: MenuItemBuilder,
        roles: ['MenuEditor', 'OrgAdmin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/menuitem/builder/:id',
        name: 'MenuItemBuilder',
        element: MenuItemBuilder,
        roles: ['MenuEditor', 'OrgAdmin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: `/dashboards/menueditor`,
        name: `Overview`,
        element: MenuEditorDash,
        roles: ['MenuEditor', 'OrgAdmin'],
        exact: true,
        isAnonymous: false,
    },
];

const menuRoutes = [
    {
        path: '/menus',
        name: 'Menus',
        element: Menus,
        roles: ['OrgAdmin', 'MenuEditor'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/menus/menubuilder',
        name: 'MenuBuilderContainer',
        element: MenuBuilderContainer,
        roles: ['OrgAdmin', 'MenuEditor'],
        exact: true,
        isAnonymous: false,
    },
];

const cartItemRoutes = [
    {
        path: '/cart',
        name: 'cart',
        exact: true,
        element: Cart,
        roles: [],
        isAnonymous: false,
        isSimple: false,
    },
];
const employeeRoutes = [
    {
        path: '/employeeform',
        name: 'AddEmployee',
        exact: true,
        element: EmployeesForm,
        roles: ['OrgAdmin'],
        isAnonymous: false,
    },
    {
        path: '/employees',
        name: 'Employees',
        exact: true,
        element: Employees,
        roles: ['OrgAdmin'],
        isAnonymous: false,
    },
    {
        path: '/employeeform/edit/:id',
        name: 'Edit Employees',
        exact: false,
        element: EmployeesForm,
        roles: ['OrgAdmin'],
        isAnonymous: false,
    },
    {
        path: '/employees/view/:id',
        name: 'View Employees',
        exact: false,
        element: EmployeeView,
        roles: ['OrgAdmin'],
        isAnonymous: false,
    },
];

const NewsletterAdmin = [
    {
        path: '/newslettersubscription/admin',
        name: 'NewsletterSubscriptionAdmin',
        element: NewsletterSubAdminSubscribers,
        roles: [],
        exact: true,
        isAnonymous: false,
        isSimple: false,
    },
];

const tags = [
    {
        path: '/menuitemtags',
        name: 'A secured Route',
        exact: true,
        element: MenuItemTags,
        roles: ['SysAdmin', 'Admin', 'OrgAdmin', 'User'],
        isAnonymous: false,
        isSimple: false,
    },
];

const test = [
    {
        path: '/test',
        name: 'Test',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Fail'],
        isAnonymous: false,
        isSimple: false,
    },
    {
        path: '/secured',
        name: 'A Secured Route',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['Fail'],
        isAnonymous: false,
        isSimple: false,
    },
    {
        path: '/secured2',
        name: 'A Secured Route',
        exact: true,
        element: AnalyticsDashboards,
        roles: ['SysAdmin'],
        isAnonymous: false,
    },
];

const orgRoutes = [
    {
        path: '/organizations',
        name: 'OrgWizard',
        element: OrgWizard,
        roles: ['OrgAdmin', 'SysAdmin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/licenses',
        name: 'AddUserLicense',
        exact: true,
        element: LicenseUserPage,
        roles: ['user'],
        isAnonymous: false,
        isSimple: false,
    },
    {
        path: '/organizations/invite',
        name: 'OrgInvite',
        element: OrgInvite,
        roles: ['OrgAdmin', 'Admin'],
        exact: true,
        isAnonymous: false,
    },
    {
        path: '/licensesAdmin',
        name: 'LicenseAdmin',
        exact: true,
        element: LicensesAdminPage,
        roles: ['Admin'],
        isAnonymous: false,
        isSimple: false,
    },
];

const errorRoutes = [
    {
        path: '*',
        name: 'Error - 404',
        element: PageNotFound,
        roles: [],
        exact: true,
        isAnonymous: false,
        isSimple: false,
    },
];
const ingredients = [
    {
        path: '/ingredients',
        name: 'Ingredients',
        exact: true,
        element: Ingredients,
        roles: ['OrgAdmin', 'MenuEditor', 'Admin'],
        isAnonymous: false,
    },
    {
        path: '/ingredientadd',
        name: 'Create Ingredients',
        exact: true,
        element: IngredientAdd,
        roles: ['OrgAdmin', 'MenuEditor', 'Admin', 'Developer'],
        isAnonymous: false,
    },
    {
        path: '/ingredientadd/:id',
        name: 'Ingredient Add',
        exact: true,
        element: IngredientAdd,
        roles: ['OrgAdmin', 'MenuEditor', 'Admin', 'Developer'],
        isAnonymous: false,
    },
];
const alternateIngredients = [
    {
        path: 'menus/items/ingredients/alternates',
        name: 'Alternate Ingredient Add',
        exact: true,
        element: AlternateIngredientsParentForm,
        roles: ['OrgAdmin', 'MenuEditor', 'Admin'],
        isAnonymous: false,
    },
];

const profileRoutes = [
    {
        path: '/users/profiles',
        name: 'UserProfile',
        exact: true,
        element: UserProfile,
        roles: ['SysAdmin'],
        isAnonymous: false,
        isSimple: false,
    },
    {
        path: '/users/profiles/add',
        name: 'UserProfileForm',
        exact: true,
        element: UserProfileForm,
        roles: ['Customer', 'SysAdmin'],
        isAnonymous: false,
        isSimple: false,
    },
    {
        path: '/users/profiles/:id/edit',
        name: 'UserProfileForm',
        exact: true,
        element: UserProfileForm,
        roles: [],
        isAnonymous: false,
        isSimple: false,
    },
    {
        path: '/users/profiles/:id',
        name: 'UserProfileView',
        exact: true,
        element: UserProfileView,
        roles: ['SysAdmin'],
        isAnonymous: false,
        isSimple: false,
    },
];

const locationRoutes = [
    {
        path: '/location/edit/:id',
        name: 'LocationUpdate',
        exact: true,
        element: LocationForm,
        roles: [],
        isAnonymous: false,
    },
    {
        path: '/location/add',
        name: 'LocationForm',
        exact: true,
        element: LocationForm,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/userlocations',
        name: 'UserLocations',
        exact: true,
        element: UserLocations,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/location/add',
        name: 'LocationForm',
        exact: true,
        element: LocationForm,
        roles: [],
        isAnonymous: true,
    },
    {
        path: '/userlocations',
        name: 'UserLocations',
        exact: true,
        element: UserLocations,
        roles: [],
        isAnonymous: true,
    },
];
const allRoutes = [
    ...alternateIngredients,
    ...dashboardRoutes,
    ...test,
    ...menuItemsRoutes,
    ...profileRoutes,
    ...NewsletterAdmin,
    ...cartItemRoutes,
    ...errorRoutes,
    ...employeeRoutes,
    ...orgRoutes,
    ...menuRoutes,
    ...ingredients,
    ...alternateIngredients,
    ...locationRoutes,
    ...tags,
    ...adminDashboardRoutes,
    ...menuRoutes,
];

export default allRoutes;
