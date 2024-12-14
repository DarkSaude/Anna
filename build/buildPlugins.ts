import webpack, { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import { platform } from "os";

/*---- Подключение плагинов ----*/
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import path from "path";

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration['plugins'] {

    /*---- Настройка режима разработки сайта ----*/
    const isDev = mode === "development";
    const isProd = mode === "production";

/*---- Массив с плагинами ----*/

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({template: paths.html, favicon: path.resolve(paths.assets, "favicon.ico")}),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
        })
    ]

    if(isDev) {
        plugins.push(new webpack.ProgressPlugin())

/*---- Выносит проверку типов в отдельный процесс: не нагружая сборку ----*/
        plugins.push(new ForkTsCheckerWebpackPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    if(isProd){

        plugins.push(new MiniCssExtractPlugin({
                filename:'css/[name].[contenthash].css',
                chunkFilename: 'css/[name].[contenthash].css'
            }))
        plugins.push(new CopyPlugin({
            patterns: [
                { from: path.resolve(paths.src, 'locales'),
                to: path.resolve(paths.output, 'locales') },
            ],
        }),)

    }

    if(analyzer){

        plugins.push(new BundleAnalyzerPlugin())
        
    }

    return plugins;

}