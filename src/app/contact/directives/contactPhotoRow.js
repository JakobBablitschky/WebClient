import { PHOTO_PLACEHOLDER_URL } from '../../constants';

/* @ngInject */
function contactPhotoRow(contactPhotoModal) {
    return {
        restrict: 'E',
        replace: true,
        require: '^form',
        scope: {
            value: '=',
            form: '='
        },
        templateUrl: require('../../../templates/contact/contactPhotoRow.tpl.html'),
        link(scope, element, attr, ngFormController) {
            const updateImage = (uri) => scope.value = uri || PHOTO_PLACEHOLDER_URL;
            const actions = {
                edit() {
                    contactPhotoModal.activate({
                        params: {
                            uri: scope.value === PHOTO_PLACEHOLDER_URL ? '' : scope.value,
                            submit(uri) {
                                contactPhotoModal.deactivate();
                                scope.$applyAsync(() => {
                                    updateImage(uri);
                                    ngFormController.$setDirty();
                                });
                            },
                            cancel() {
                                contactPhotoModal.deactivate();
                            }
                        }
                    });
                },
                clear() {
                    scope.$applyAsync(() => {
                        updateImage(PHOTO_PLACEHOLDER_URL);
                        ngFormController.$setDirty();
                    });
                }
            };

            const onClick = ({ target }) => actions[target.getAttribute('data-action')]();

            element.on('click', onClick);

            updateImage(scope.value);

            scope.$on('$destroy', () => {
                element.off('click', onClick);
            });
        }
    };
}
export default contactPhotoRow;
