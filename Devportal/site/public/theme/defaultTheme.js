const Configurations = {
    palette: {
        primary: { main: '#00b4ff' },
        background: {
            default: '#efefef',
            paper: '#ffffff',
            drawer: '#1a1f2f',
        },
    },
    overrides: { MuiStepLabel: { active: { color: '#6bc6ff !important' }, label: { color: '#fff !important' } } },
    custom: {
        appBar: {
            logo: '/site/public/ob/images/logo.svg',
            logoHeight: 48,
            logoWidth: 190,
            background: '#18184c',
            searchInputBackground: '#18184c',
            searchInputActiveBackground: '#202065',
            activeBackground: '#00b4ff',
        },
        infoBar: {
            background: '#efefef',
            sliderBackground: '#efefef',
        },
        tagCloud: { active: false },
        listView: {
            tableHeadBackground: '#0d0d25',
        },
        thumbnail: {
            width: 240,
            contentPictureOverlap: false,
            iconColor: 'rgba(0, 0, 0, 0.5)',
            listViewIconSize: 10,
            contentBackgroundColor: 'rgba(239, 239, 239, 0.8)',
            backgrounds: [
                { prime: 0x468fccff, sub: 0x89b8deff },
                { prime: 0x468fccff, sub: 0x89b8deff },
                { prime: 0x468fccff, sub: 0x89b8deff },
                { prime: 0x468fccff, sub: 0x89b8deff },
                { prime: 0x468fccff, sub: 0x89b8deff },
                { prime: 0x468fccff, sub: 0x89b8deff },
            ],
        },
        footer: {
            text: 'WSO2 Open Banking | © 2020 Powered by WSO2 Financial Solutions',
            background: '#1c2c45',
        },
        leftMenu: {
            background: '#0d0d25',
            leftMenuActive: '#468fcc',
            leftMenuActiveSubmenu: '#82add2',
        },
        title: {
            prefix: '[Devportal]',
            sufix: ' - WSO2 Open Banking',
        },
    },
};
