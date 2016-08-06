module.exports = $mdThemingProvider => {
    var customPrimary = {
        '50': '#50ff7e',
        '100': '#37ff6b',
        '200': '#1dff58',
        '300': '#04ff45',
        '400': '#00e93d',
        '500': '#00D036',
        '600': '#00b62f',
        '700': '#009d29',
        '800': '#008322',
        '900': '#006a1c',
        'A100': '#6aff91',
        'A200': '#83ffa4',
        'A400': '#9dffb6',
        'A700': '#005015'
    };
    $mdThemingProvider
    .definePalette('customPrimary',
    customPrimary);

    var customAccent = {
        '50': '#664200',
        '100': '#805300',
        '200': '#996300',
        '300': '#b37300',
        '400': '#cc8400',
        '500': '#e69500',
        '600': '#ffae1a',
        '700': '#ffb733',
        '800': '#ffc04d',
        '900': '#ffc966',
        'A100': '#ffae1a',
        'A200': '#FFA500',
        'A400': '#e69500',
        'A700': '#ffd280'
    };
    $mdThemingProvider
    .definePalette('customAccent',
    customAccent);

    var customWarn = {
        '50': '#fbcb9b',
        '100': '#fbbf82',
        '200': '#fab26a',
        '300': '#f9a551',
        '400': '#f89939',
        '500': 'F78C20',
        '600': '#f57f09',
        '700': '#dc7208',
        '800': '#c36607',
        '900': '#ab5906',
        'A100': '#fcd8b4',
        'A200': '#fde5cc',
        'A400': '#fef2e5',
        'A700': '#924c05'
    };
    $mdThemingProvider
    .definePalette('customWarn',
    customWarn);

    var customBackground = {
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#ffffff',
        '400': '#ffffff',
        '500': '#FFFFFF',
        '600': '#f2f2f2',
        '700': '#e6e6e6',
        '800': '#d9d9d9',
        '900': '#cccccc',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#bfbfbf'
    };
    $mdThemingProvider
    .definePalette('customBackground',
    customBackground);

    $mdThemingProvider.theme('default')
    .primaryPalette('customPrimary')
    .accentPalette('customAccent')
    .warnPalette('customWarn')
    .backgroundPalette('customBackground');
};
