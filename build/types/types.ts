export interface BuildPaths {
    entry: string;
    html: string;
    assets: string;
    output: string;
    src: string;
}

/*---- Переключение на модели разработки ----*/
export type BuildMode = "production" | "development";
export type BuildPlatform = "mobile" | "desktop";

export interface BuildOptions {
    port:number;
    paths: BuildPaths;
    mode:BuildMode;
    platform:BuildPlatform;
    analyzer?:boolean;
}