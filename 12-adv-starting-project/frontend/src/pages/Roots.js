import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

export default function RootsLayout() {

    // const navigation = useNavigation(); //Ele diz se estamos numa transição, estamos carregando dados para uma transição ou não há transição de páginas.

    return (
        <>
            <MainNavigation />
            <main>
                {/* {navigation.state === 'loading' && <p>Hang on...</p>} */}
                <Outlet />
            </main>
        </>
    );
}