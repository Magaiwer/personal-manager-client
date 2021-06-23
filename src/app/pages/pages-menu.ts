import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'HOME',
    link: '/pages/dashboard/',
    icon: 'home',
    home: true,
    selected: true,
  },
  {
    title: 'Cadastros',
    icon: 'edit-2-outline',
    expanded: true,
    selected: false,
    pathMatch: 'prefix',
    children: [
      {
        title: 'Categorias',
        link: '/pages/category/',
      },
      {
        title: 'Transactions',
        link: '/pages/transaction',
      },
      /*{
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },*/
    ],
  },
  /*{
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },*/
];
