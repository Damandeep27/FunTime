import development from './dev';
import production from './prod';

const isDev = () => {
    console.log('[FunTime] running on', process.env.NODE_ENV);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') return development;

    return production;
}

export default isDev;