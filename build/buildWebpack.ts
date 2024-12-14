import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions) : webpack.Configuration {

    const {mode, paths} = options;
    const isDev = mode === "development";

    return {

        /*---- Режим разработки проекта ----*/        
            mode: mode ?? "development",
        
        /*---- Входной файл подключения ----*/
            entry: {
                main: paths.entry
            },
        
        /*---- Куда будут складыватся собранные файлы ----*/
            output: {
                path: paths.output,
                clean: true,
                filename: "[name].[contenthash].js"
            },
        
        /*---- Плагины ----*/
        
        /*---- HTML Плагин ----*/
            plugins:buildPlugins(options),
        
        /*---- Модули ----*/
            module:{
                rules: buildLoaders(options),
            },
        
        /*---- Указываем расширения файлов ----*/
            resolve: buildResolvers(options),
        
        /*---- Sours map - Отслеживаение ошибок ----*/
            devtool: isDev && "inline-source-map",
        
        /*---- Запуск сервера ----*/
            devServer: isDev ? buildDevServer(options) : undefined
        
            }
}