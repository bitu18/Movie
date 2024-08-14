import NavOptions from '~/components/NavOptions';
import { useOptions } from '../hooks';

function Options() {
    const { showMobileOptions } = useOptions();
    return showMobileOptions && <NavOptions />;
}

export default Options;
