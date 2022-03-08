export const MenuList = [//thinking of moved to API
    {
        id: 0,
        name: 'Pomoc techniczna',
        icon: 'fa-solid fa-comment',
        permissions: "ALL",
        to: '/helpdesk'
    },
    {
        id: 1,
        name: 'Zaloguj/Wyloguj',
        icon: 'fa-solid fa-user',
        permissions: "ALL",
        to: '/login'
    },
    {
        id: 2,
        name: 'Moje rezerwacje',
        icon: 'fa-solid fa-clipboard-list',
        permissions: ["USER"],
        to: '/myReservations'
    },
    {
        id: 3,
        name: 'O nas',
        icon: 'fa-solid fa-users',
        permissions: "ALL",
        to: '/aboutus'

    },
    {
        id: 4,
        name: 'Aktualne wyloty',
        icon: 'fa-solid fa-plane',
        permissions: "ALL",
        to: '/flights'
    },
    {
        id: 5,
        name: 'Aktualności',
        icon: 'fa-solid fa-newspaper',
        permissions: "ALL",
        to: '/messages'
    },
    {
        id: 6,
        name: 'Pracownik',
        icon: 'fa-solid fa-clipboard-user',
        permissions: ["EMPLOYEE"],
        to: '/employee'
    },
    {
        id: 7,
        name: 'Admin',
        icon: 'fa-solid fa-user-chef',
        permissions: ["ADMIN", "SUPERADMIN"],
        to: '/Admin'
    },
]