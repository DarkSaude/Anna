import { ModuleOptions, runtime } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { BuildOptions } from "./types/types";
import loader from "mini-css-extract-plugin/types/loader";
import { buildBabelLoader } from "./babel/buildBabelLoaders";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

    /*---- Настройка режима разработки сайта ----*/
    const isDev = options.mode === "development";

/*---- Настройка css-loader ----*/
    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },
        },
    }

/*---- Настройка Ассетов (Картинок для сайта) ----*/
    const assetLoader =  {

        test: /\.(?:|png|jpg|jpeg|gif)$/i,
        type: "asset/resource"

    }

/*---- Настройка SVG Картинок ----*/
const svgrLoader = {
    test: /\.svg$/i,
    use: [
        {
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            }
                        }
                    ]
                }
            }
        }
    ],
}

/*---- SCSS - Обработка стилей ----*/
    const scssLoader = {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            "sass-loader",
        ],
    }

/*---- BabelLoader ----*/
    const babelLoader = buildBabelLoader(options)

/*---- TS JavsScript ----*/
    const tsLoader = {
        // ts-loader - умеет работать с JSX
        // Если б не использовали тайпскрипт: нужен был бы babel-loader
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
            loader: "ts-loader",
            options: {
                transpileOnly: isDev,
                getCustomTransformers: () => ({
                    before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                })
            }
        }]
    }

    return [
        // tsLoader,
        babelLoader,
        scssLoader,
        assetLoader,
        svgrLoader
    ]
}