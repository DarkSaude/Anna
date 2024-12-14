import { BuildOptions } from "build/types/types";
import { removeDataTestidBabelPlugin } from "./removeDataTestidBabelPlugin";


export function buildBabelLoader({mode}: BuildOptions) {
    const isDev = mode === 'development';
    const isProd= mode === 'production';

/*---- Babel Настройка и условия для плагина который удаляет data-testid ----*/
    const plugins = [];

    if(isProd){
        plugins.push([
            removeDataTestidBabelPlugin,
            {
                props: ['data-testid']
            }
        ])
    }

    return {
        test: /\.(m?js|jsx|tsx)$/i,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript',
                    [
                        '@babel/preset-react',
                        {
                            runtime: isDev ? 'automatic' : 'classic',
                        }
                    ]
                ],
                plugins: plugins.length ? plugins : undefined,
            }
        }
    }
}