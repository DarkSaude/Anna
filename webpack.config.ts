import webpack, { web } from "webpack";
import path from "path";
// import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildWebpack } from "./build/buildWebpack";
import { BuildMode, BuildPaths, BuildPlatform } from "./build/types/types";



interface EnvVariables {
    mode?: BuildMode;
    analyzer?:boolean;
    port?:number;
    platform?: BuildPlatform;
}

export default (env: EnvVariables) => {

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src','index.tsx'),
        output: path.resolve(__dirname,'app'),
        html: path.resolve(__dirname,'src/publick','index.html'),
        assets: path.resolve(__dirname,'src/assets/favicon'),
        src: path.resolve(__dirname,'src')
    }

    const config : webpack.Configuration = buildWebpack({
        port:env.port ?? 3000,
        mode:env.mode ?? "development",
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? "desktop"
    })
    return config;

    }