angular.module('NotifierInit', ['ui-notification'])
    .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 2000,
            startTop: 50,
            startRight: 0,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'bottom'
        });
    });