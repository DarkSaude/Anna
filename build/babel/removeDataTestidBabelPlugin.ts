import { PluginItem } from "@babel/core";

/*---- Плагин для удаления части кода data-testid ----*/
export function removeDataTestidBabelPlugin(): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const forbiddenProps = state.opts.props || [];

                path.traverse({
                    JSXIdentifier(current) {
                        const nodeName = current.node.name;
                        if (forbiddenProps.includes(nodeName)) {
                            current.parentPath.remove();
                        }
                    }
                })
            }
        }
    }
}